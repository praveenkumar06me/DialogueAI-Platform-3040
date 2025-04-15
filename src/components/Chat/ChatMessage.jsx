import React from 'react';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
import { RiRobot2Fill } from 'react-icons/ri';
import { format } from 'date-fns';
import { AI_ROLES } from '../../services/ai/types';

const ChatMessage = ({ message, type }) => {
  const isUser = type === AI_ROLES.USER;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-6 ${isUser ? 'bg-user-bg' : 'bg-assistant-bg'}`}
    >
      <div className="max-w-3xl mx-auto flex gap-6 items-start">
        <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0
          ${isUser ? 'bg-slate-700' : 'bg-primary'}`}
        >
          {isUser ? <FaUser className="text-white w-5 h-5" /> : <RiRobot2Fill className="text-white w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-300">
              {isUser ? 'You' : 'Assistant'}
            </span>
            <span className="text-xs text-gray-500">
              {format(new Date(message.timestamp), 'HH:mm')}
            </span>
          </div>
          <div className="prose prose-invert max-w-none">
            {message.content}
          </div>
          {message.metadata?.model && (
            <div className="mt-2 text-xs text-gray-500">
              Model: {message.metadata.model}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;