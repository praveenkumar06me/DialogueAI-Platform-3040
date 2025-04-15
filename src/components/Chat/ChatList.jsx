import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiMessageSquareDots, BiTrash } from 'react-icons/bi';
import { format } from 'date-fns';

const ChatList = ({ chats, onSelectChat, onDeleteChat, selectedChatId }) => {
  return (
    <div className="flex-1 overflow-y-auto py-2">
      <AnimatePresence>
        {Object.entries(chats).map(([chatId, chat]) => (
          <motion.div
            key={chatId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`group flex items-center p-3 rounded-lg cursor-pointer mb-1 transition-colors
              ${selectedChatId === chatId ? 'bg-gray-700' : 'hover:bg-gray-700/50'}`}
            onClick={() => onSelectChat(chatId)}
          >
            <BiMessageSquareDots className="w-5 h-5 text-gray-400 mr-3" />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white truncate">
                {chat.title || 'New Chat'}
              </div>
              <div className="text-xs text-gray-400">
                {format(new Date(chat.lastUpdated), 'MMM d, yyyy')}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chatId);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
            >
              <BiTrash className="w-4 h-4 text-red-400" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ChatList;