import type { ChromeMessage, TabInfo, Session, MemorySummary } from '@mindtab/shared';
import { generateId } from '@mindtab/shared';

const activeSessions: Map<number, Session> = new Map();

function sendMessageSafely(message: ChromeMessage) {
  chrome.runtime.sendMessage(message).catch(() => {
    console.debug('[MindTab] No listener for message:', message.type);
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('[MindTab] Extension installed');

  chrome.contextMenus.create({
    id: 'mindtab-save-to-memory',
    title: '保存到 MindTab 记忆',
    contexts: ['page', 'selection'],
  });

  chrome.contextMenus.create({
    id: 'mindtab-add-bookmark',
    title: '添加到 MindTab 书签',
    contexts: ['page'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'mindtab-save-to-memory') {
    sendMessageSafely({
      type: 'SAVE_MEMORY',
      payload: {
        url: tab?.url,
        title: tab?.title,
        selection: info.selectionText,
      },
    });
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabId = activeInfo.tabId;

  try {
    const tab = await chrome.tabs.get(tabId);
    if (tab && tab.url && !tab.url.startsWith('chrome://')) {
      await handleTabActivated(tab);
    }
  } catch (error) {
    console.error('[MindTab] Error handling tab activation:', error);
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.id && tab.url && !tab.url.startsWith('chrome://')) {
    createSession(tab);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  endSession(tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
    updateSession(tabId, tab);
  }
});

async function handleTabActivated(tab: chrome.tabs.Tab) {
  if (!tab.id || !tab.url) return;

  const existingSession = activeSessions.get(tab.id);
  if (existingSession) {
    sendMessageSafely({
      type: 'TAB_ACTIVATED',
      payload: existingSession,
    });
  } else {
    const session = await createSession(tab);
    sendMessageSafely({
      type: 'TAB_ACTIVATED',
      payload: session,
    });
  }
}

async function createSession(tab: chrome.tabs.Tab): Promise<Session | null> {
  if (!tab.id || !tab.url) return null;

  const session: Session = {
    id: generateId(),
    url: tab.url,
    title: tab.title || 'Untitled',
    startedAt: Date.now(),
    keywords: [],
  };

  activeSessions.set(tab.id, session);

  sendMessageSafely({
    type: 'SESSION_CREATED',
    payload: session,
  });

  return session;
}

function endSession(tabId: number) {
  const session = activeSessions.get(tabId);
  if (session) {
    session.endedAt = Date.now();
    session.duration = session.endedAt - session.startedAt;

    sendMessageSafely({
      type: 'SESSION_ENDED',
      payload: session,
    });

    activeSessions.delete(tabId);
  }
}

function updateSession(tabId: number, tab: chrome.tabs.Tab) {
  const session = activeSessions.get(tabId);
  if (session && tab.url) {
    session.url = tab.url;
    session.title = tab.title || session.title;

    sendMessageSafely({
      type: 'SESSION_UPDATED',
      payload: session,
    });
  }
}

chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, sendResponse) => {
  const handleMessage = async () => {
    try {
      switch (message.type) {
        case 'GET_TABS':
          return await getTabs();

        case 'GET_ACTIVE_TAB':
          return await getActiveTab();

        case 'GET_HISTORY':
          return await getHistory(message.payload as { days?: number });

        case 'GET_BOOKMARKS':
          return await getBookmarks();

        case 'GET_MEMORY_SUMMARY':
          return await getMemorySummary();

        case 'SAVE_MEMORY':
          return await saveMemory(message.payload as { url?: string; title?: string; selection?: string });

        default:
          return { success: false, error: 'Unknown message type' };
      }
    } catch (error) {
      console.error('[MindTab] Message handler error:', error);
      return { success: false, error: String(error) };
    }
  };

  handleMessage().then(sendResponse);
  return true;
});

async function getTabs(): Promise<{ success: boolean; data?: TabInfo[] }> {
  try {
    const tabs = await chrome.tabs.query({});
    const tabInfos: TabInfo[] = tabs
      .filter((tab) => tab.id && tab.url && !tab.url.startsWith('chrome://'))
      .map((tab) => ({
        id: tab.id!,
        url: tab.url!,
        title: tab.title || '',
        favIconUrl: tab.favIconUrl,
        active: tab.active,
        windowId: tab.windowId,
      }));
    return { success: true, data: tabInfos };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

async function getActiveTab(): Promise<{ success: boolean; data?: TabInfo }> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      return {
        success: true,
        data: {
          id: tab.id,
          url: tab.url || '',
          title: tab.title || '',
          favIconUrl: tab.favIconUrl,
          active: true,
          windowId: tab.windowId,
        },
      };
    }
    return { success: false, error: 'No active tab' };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

async function getHistory(payload: { days?: number }): Promise<{ success: boolean; data?: chrome.history.HistoryItem[] }> {
  try {
    const days = payload.days || 7;
    const startTime = Date.now() - days * 24 * 60 * 60 * 1000;

    const history = await chrome.history.search({
      text: '',
      startTime,
      maxResults: 100,
    });

    return { success: true, data: history };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

async function getBookmarks(): Promise<{ success: boolean; data?: chrome.bookmarks.BookmarkTreeNode[] }> {
  try {
    const bookmarks = await chrome.bookmarks.getTree();
    return { success: true, data: bookmarks };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

async function getMemorySummary(): Promise<{ success: boolean; data?: MemorySummary }> {
  try {
    const tabs = await getTabs();
    const recentSessions = Array.from(activeSessions.values()).slice(-10);

    return {
      success: true,
      data: {
        recentTabs: tabs.data || [],
        recentSessions,
        totalSessions: activeSessions.size,
      },
    };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

async function saveMemory(payload: { url?: string; title?: string; selection?: string }): Promise<{ success: boolean }> {
  console.log('[MindTab] Saving memory:', payload);
  return { success: true };
}

export {};
