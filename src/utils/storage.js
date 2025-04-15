const CHATS_KEY = 'chatHistory';

export const saveChat = (chatId, chatData) => {
  try {
    const chats = getAllChats();
    chats[chatId] = chatData;
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error('Error saving chat:', error);
  }
};

export const getAllChats = () => {
  try {
    const chats = localStorage.getItem(CHATS_KEY);
    return chats ? JSON.parse(chats) : {};
  } catch (error) {
    console.error('Error getting chats:', error);
    return {};
  }
};

export const deleteChat = (chatId) => {
  try {
    const chats = getAllChats();
    delete chats[chatId];
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error('Error deleting chat:', error);
  }
};

export const getChatById = (chatId) => {
  try {
    const chats = getAllChats();
    return chats[chatId] || null;
  } catch (error) {
    console.error('Error getting chat:', error);
    return null;
  }
};