export const AI_CONFIG = {
  API_KEY: import.meta.env.VITE_OPENAI_API_KEY || 'demo-mode',
  API_ENDPOINT: 'https://api.openai.com/v1/chat/completions',
  MODEL: 'gpt-3.5-turbo',
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
  SYSTEM_PROMPT: `You are a helpful AI assistant. Be concise and clear in your responses.
    Format your responses using markdown when appropriate.`,
};