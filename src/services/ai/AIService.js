import { OpenAIProvider } from './providers/openai';
import { AI_CONFIG } from './config';

class AIService {
  constructor() {
    this.provider = new OpenAIProvider(AI_CONFIG.API_KEY);
  }

  async generateResponse(messages) {
    try {
      return await this.provider.generateResponse(messages);
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();