(function() {
  'use strict';

  const SESSION_KEY = 'mindtab_session_id';

  let currentSessionId = null;
  let tabStartTime = Date.now();

  function getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  function sendToBackground(message) {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        console.warn('[MindTab Content] Runtime error:', chrome.runtime.lastError);
      }
    });
  }

  function collectPageData() {
    const data = {
      url: window.location.href,
      title: document.title,
      description: getMetaContent('description'),
      keywords: getMetaContent('keywords'),
      ogImage: getMetaContent('og:image'),
      textContent: getMainContent(),
      links: collectLinks(),
      timestamp: Date.now(),
    };

    return data;
  }

  function getMetaContent(name) {
    const meta = document.querySelector(`meta[name="${name}"]`) ||
                 document.querySelector(`meta[property="og:${name}"]`) ||
                 document.querySelector(`meta[property="${name}"]`);
    return meta ? meta.getAttribute('content') : '';
  }

  function getMainContent() {
    const main = document.querySelector('main') ||
                 document.querySelector('article') ||
                 document.querySelector('[role="main"]') ||
                 document.body;

    const clone = main.cloneNode(true);

    const removeSelectors = ['script', 'style', 'nav', 'footer', 'header', 'aside', 'iframe', 'noscript'];
    removeSelectors.forEach(selector => {
      clone.querySelectorAll(selector).forEach(el => el.remove());
    });

    return clone.textContent?.trim().slice(0, 5000) || '';
  }

  function collectLinks() {
    const links = Array.from(document.querySelectorAll('a[href]'))
      .slice(0, 20)
      .map(a => ({
        href: a.href,
        text: a.textContent?.trim().slice(0, 100),
      }));
    return links;
  }

  function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      sendPageData();
    }
  }

  function sendPageData() {
    if (window.location.protocol.startsWith('chrome')) {
      return;
    }

    const data = collectPageData();
    data.sessionId = getOrCreateSessionId();
    data.duration = Date.now() - tabStartTime;

    sendToBackground({
      type: 'PAGE_DATA',
      payload: data,
    });
  }

  let debounceTimer = null;
  function onContentChange() {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      const data = collectPageData();
      data.sessionId = getOrCreateSessionId();
      data.isUpdate = true;
      sendToBackground({
        type: 'PAGE_DATA',
        payload: data,
      });
    }, 5000);
  }

  const observer = new MutationObserver(onContentChange);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  document.addEventListener('visibilitychange', onVisibilityChange);

  window.addEventListener('beforeunload', () => {
    observer.disconnect();
    sendPageData();
  });

  if (document.readyState === 'complete') {
    currentSessionId = getOrCreateSessionId();
    sendPageData();
  } else {
    window.addEventListener('load', () => {
      currentSessionId = getOrCreateSessionId();
      setTimeout(sendPageData, 1000);
    });
  }

  chrome.runtime.sendMessage({
    type: 'CONTENT_SCRIPT_READY',
    payload: { sessionId: currentSessionId },
  });

  console.log('[MindTab] Content script loaded for:', window.location.hostname);
})();
