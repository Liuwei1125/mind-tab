import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AIMessage } from '@mindtab/shared';
import { generateId } from '@mindtab/shared';

interface AIState {
  messages: AIMessage[];
  isProcessing: boolean;
  error: string | null;
  provider: 'openai' | 'deepseek' | 'local';
  model: string;
  apiKey: string;
}

interface AIActions {
  addMessage: (role: AIMessage['role'], content: string) => AIMessage;
  sendMessage: (content: string) => Promise<void>;
  clearHistory: () => void;
  setProcessing: (isProcessing: boolean) => void;
  setError: (error: string | null) => void;
  setProvider: (provider: AIState['provider']) => void;
  setModel: (model: string) => void;
  setApiKey: (apiKey: string) => void;
}

type AIStore = AIState & AIActions;

const initialState: AIState = {
  messages: [],
  isProcessing: false,
  error: null,
  provider: 'openai',
  model: 'gpt-4',
  apiKey: '',
};

export const useAIStore = create<AIStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addMessage: (role, content) => {
        const message: AIMessage = {
          id: generateId(),
          role,
          content,
          createdAt: Date.now(),
        };
        set((state) => ({
          messages: [...state.messages, message],
        }));
        return message;
      },

      sendMessage: async (content) => {
        const { addMessage, setProcessing, setError, provider, apiKey, model } = get();

        addMessage('user', content);
        setProcessing(true);
        setError(null);

        try {
          const userMessage = addMessage('user', content);

          const response = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [...get().messages.filter((m) => m.id !== userMessage.id), userMessage],
              provider,
              model,
              apiKey,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to get AI response');
          }

          const data = await response.json();
          addMessage('assistant', data.content);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Unknown error');
        } finally {
          setProcessing(false);
        }
      },

      clearHistory: () => {
        set({ messages: [], error: null });
      },

      setProcessing: (isProcessing) => {
        set({ isProcessing });
      },

      setError: (error) => {
        set({ error });
      },

      setProvider: (provider) => {
        set({ provider });
      },

      setModel: (model) => {
        set({ model });
      },

      setApiKey: (apiKey) => {
        set({ apiKey });
      },
    }),
    {
      name: 'mindtab-ai',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        provider: state.provider,
        model: state.model,
        apiKey: state.apiKey,
        messages: state.messages.slice(-50),
      }),
    }
  )
);
