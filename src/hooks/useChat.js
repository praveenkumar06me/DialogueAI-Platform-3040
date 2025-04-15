import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveChat, deleteChat, getAllChats } from '../utils/storage';
import { aiService } from '../services/ai/AIService';
import { AI_ROLES } from '../services/ai/types';

export const useChat = () => {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState(() => getAllChats());
  const [error, setError] = useState(null);

  const createNewChat = useCallback(() => {
    const newChatId = uuidv4();
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      lastUpdated: new Date().toISOString(),
    };

    setChats(prev => ({ ...prev, [newChatId]: newChat }));
    saveChat(newChatId, newChat);
    setChatId(newChatId);
    setMessages([]);
    setError(null);
  }, []);

  const selectChat = useCallback((id) => {
    setChatId(id);
    setMessages(chats[id].messages);
    setError(null);
  }, [chats]);

  const deleteSelectedChat = useCallback((id) => {
    deleteChat(id);
    setChats(prev => {
      const newChats = { ...prev };
      delete newChats[id];
      return newChats;
    });
    
    if (chatId === id) {
      setChatId(null);
      setMessages([]);
    }
  }, [chatId]);

  const sendMessage = useCallback(async (content) => {
    if (!chatId) {
      createNewChat();
    }

    setError(null);
    
    const userMessage = {
      id: uuidv4(),
      content,
      type: AI_ROLES.USER,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await aiService.generateResponse([...messages, userMessage]);
      
      const assistantMessage = {
        id: aiResponse.messageId,
        content: aiResponse.content,
        type: AI_ROLES.ASSISTANT,
        timestamp: new Date().toISOString(),
        metadata: aiResponse.metadata,
      };

      setMessages(prev => [...prev, assistantMessage]);

      const updatedChat = {
        id: chatId,
        title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
        messages: [...messages, userMessage, assistantMessage],
        lastUpdated: new Date().toISOString(),
      };

      setChats(prev => ({ ...prev, [chatId]: updatedChat }));
      saveChat(chatId, updatedChat);
    } catch (err) {
      setError('Failed to generate AI response. Please try again.');
      console.error('Chat Error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [chatId, messages, createNewChat]);

  return {
    chatId,
    messages,
    isLoading,
    error,
    chats,
    sendMessage,
    createNewChat,
    selectChat,
    deleteChat: deleteSelectedChat,
  };
};