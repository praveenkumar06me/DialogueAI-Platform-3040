import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../hooks/useChat';
import ChatMessage from '../components/Chat/ChatMessage';
import ChatInput from '../components/Chat/ChatInput';
import Sidebar from '../components/Sidebar/Sidebar';

const ChatPage = () => {
  const {
    chatId,
    messages,
    isLoading,
    error,
    chats,
    sendMessage,
    createNewChat,
    selectChat,
    deleteChat,
  } = useChat();
  
  const chatEndRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex h-screen bg-chat-bg text-white">
      <Sidebar 
        onNewChat={createNewChat}
        onLogout={handleLogout}
        user={user}
        chats={chats}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
        selectedChatId={chatId}
      />
      
      <main className="flex-1 ml-64 relative">
        <div className="pb-40 pt-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              type={message.type}
            />
          ))}
          {error && (
            <div className="max-w-3xl mx-auto p-4 mt-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
              {error}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <ChatInput 
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default ChatPage;