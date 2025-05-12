import React from 'react';
import { Mail, Clock } from 'lucide-react';
import { HRMessage } from '../../types';

interface MessageCardProps {
  message: HRMessage;
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const getStatusColor = () => {
    switch (message.status) {
      case 'responded':
        return 'bg-green-100 text-green-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">HR Message</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
        </span>
      </div>
      
      <div className="mt-3 text-sm text-gray-700">
        <p className="line-clamp-3">{message.message}</p>
      </div>
      
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
        <span>Sent {formatDate(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default MessageCard;