/**
 * @typedef {Object} Message
 * @property {string} role - 'user' | 'assistant' | 'system'
 * @property {string} content - The message content
 */

/**
 * @typedef {Object} ChatResponse
 * @property {string} content - The AI response content
 * @property {string} messageId - Unique identifier for the message
 * @property {Object} metadata - Additional response metadata
 */

export const AI_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
};