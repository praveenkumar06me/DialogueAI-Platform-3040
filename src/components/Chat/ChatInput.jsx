import React, { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-chat-bg to-transparent pt-20 pb-8">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4">
        <div className="relative bg-gray-700 rounded-lg shadow-lg">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            rows="1"
            className="w-full p-4 pr-12 rounded-lg bg-transparent text-white placeholder-gray-400 
              focus:outline-none resize-none max-h-[150px]"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg
              ${isLoading ? 'text-gray-500' : 'text-primary hover:bg-gray-600'}`}
          >
            <FiSend size={20} />
          </motion.button>
        </div>
        {isLoading && (
          <div className="absolute -top-8 left-0 right-0 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-400"
            >
              Assistant is typing...
            </motion.div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatInput;