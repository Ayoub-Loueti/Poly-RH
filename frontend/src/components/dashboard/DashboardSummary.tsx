import React from 'react';
import { Calendar, MessageSquare, Clock } from 'lucide-react';
import { useRequests } from '../../context/RequestContext';

const DashboardSummary: React.FC = () => {
  const { absenceRequests, hrMessages } = useRequests();
  
  const pendingRequests = absenceRequests.filter(request => request.status === 'pending').length;
  const pendingMessages = hrMessages.filter(message => message.status === 'pending').length;
  
  // Calculate upcoming absence (the next approved absence)
  const upcomingAbsence = absenceRequests
    .filter(request => request.status === 'approved' && new Date(request.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
  
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Pending Absence Requests</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">{pendingRequests}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a href="/absence" className="font-medium text-blue-600 hover:text-blue-500">
              Request new absence
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">HR Messages</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">{pendingMessages} pending</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a href="/hr-message" className="font-medium text-blue-600 hover:text-blue-500">
              Send new message
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Absence</dt>
                <dd>
                  {upcomingAbsence ? (
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(upcomingAbsence.startDate).toLocaleDateString()} - {upcomingAbsence.absenceType}
                    </div>
                  ) : (
                    <div className="text-sm font-medium text-gray-900">No upcoming absences</div>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a href="/" className="font-medium text-blue-600 hover:text-blue-500">
              View all absences
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;