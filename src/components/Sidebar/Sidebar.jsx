import React, { useState } from 'react';
import { BiMessageSquareAdd, BiLogOut } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import ChatList from '../Chat/ChatList';

const Sidebar = ({ 
  onNewChat, 
  onLogout, 
  user, 
  chats, 
  onSelectChat, 
  onDeleteChat,
  selectedChatId 
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <motion.div 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 bottom-0 w-64 bg-secondary p-2 flex flex-col"
    >
      <button
        onClick={onNewChat}
        className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:bg-gray-700 text-white transition-colors"
      >
        <BiMessageSquareAdd size={20} />
        <span>New Chat</span>
      </button>

      <ChatList 
        chats={chats}
        onSelectChat={onSelectChat}
        onDeleteChat={onDeleteChat}
        selectedChatId={selectedChatId}
      />
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            {user?.name?.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white">{user?.name}</div>
            <div className="text-xs text-gray-400">{user?.email}</div>
          </div>
        </div>
        <motion.button
          onClick={handleLogout}
          disabled={isLoggingOut}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center gap-3 p-2 rounded-lg 
            ${isLoggingOut 
              ? 'bg-gray-700 cursor-not-allowed opacity-50' 
              : 'hover:bg-gray-700 text-red-400'} 
            transition-colors`}
        >
          <BiLogOut size={20} />
          <span>{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;