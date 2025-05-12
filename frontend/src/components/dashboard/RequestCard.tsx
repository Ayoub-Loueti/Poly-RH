import React from 'react';
import { CalendarRange, Clock } from 'lucide-react';
import { AbsenceRequest } from '../../types';

interface RequestCardProps {
  request: AbsenceRequest;
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
  const getStatusColor = () => {
    switch (request.status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium text-gray-900">{request.absenceType}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      </div>
      
      <div className="mt-3 flex items-center text-sm text-gray-500">
        <CalendarRange className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
        <span>
          {formatDate(request.startDate)} - {formatDate(request.endDate)}
        </span>
      </div>
      
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
        <span>Submitted {formatDate(request.createdAt)}</span>
      </div>
      
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-600">Duration:</span>
          <span className="text-sm text-gray-900">
            {Math.ceil((request.endDate.getTime() - request.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
          </span>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;