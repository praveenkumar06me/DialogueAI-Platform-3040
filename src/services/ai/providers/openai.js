import { AI_CONFIG } from '../config';
import { AI_ROLES } from '../types';

export class OpenAIProvider {
  constructor(apiKey = AI_CONFIG.API_KEY) {
    this.apiKey = apiKey;
  }

  async generateResponse(messages) {
    if (this.apiKey === 'demo-mode') {
      return this.generateDemoResponse(messages);
    }

    try {
      const response = await fetch(AI_CONFIG.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: AI_CONFIG.MODEL,
          messages: this.formatMessages(messages),
          max_tokens: AI_CONFIG.MAX_TOKENS,
          temperature: AI_CONFIG.TEMPERATURE,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        content: data.choices[0].message.content,
        messageId: data.id,
        metadata: {
          model: data.model,
          usage: data.usage,
        },
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  formatMessages(messages) {
    return [
      {
        role: AI_ROLES.SYSTEM,
        content: AI_CONFIG.SYSTEM_PROMPT,
      },
      ...messages.map(msg => ({
        role: msg.type,
        content: msg.content,
      })),
    ];
  }

  async generateDemoResponse(messages) {
    const lastMessage = messages[messages.length - 1].content;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const demoResponses = [
      `I understand your question about "${lastMessage}". Let me help you with that...`,
      `That's an interesting point about "${lastMessage}". Here's my analysis...`,
      `Regarding "${lastMessage}", here are my thoughts...`,
      `I've processed your input about "${lastMessage}". Here's what I found...`,
    ];

    return {
      content: demoResponses[Math.floor(Math.random() * demoResponses.length)],
      messageId: `demo-${Date.now()}`,
      metadata: {
        model: 'demo-mode',
        demo: true,
      },
    };
  }
}