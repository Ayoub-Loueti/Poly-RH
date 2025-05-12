import React, { useEffect, useState } from 'react';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import RequestCard from '../components/dashboard/RequestCard';
import MessageCard from '../components/dashboard/MessageCard';
import { useRequests } from '../context/RequestContext';
import { Link } from 'react-router-dom';

// Use the same key as in AuthContext
const USER_STORAGE_KEY = 'polyrh_user';

interface User {
  first_name: string;
  last_name: string;
  role: string;
}

const DashboardPage: React.FC = () => {
  const { absenceRequests = [], hrMessages = [] } = useRequests(); // Default to empty arrays
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Welcome back, {user ? `${user.first_name} ${user.last_name}` : 'Guest'}!
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Here's an overview of your requests and messages.
          </p>
        </div>
      </div>

      <DashboardSummary />

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">Your Recent Absence Requests</h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {absenceRequests.length > 0 ? (
            absenceRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))
          ) : (
            <div className="col-span-full text-center py-6 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No absence requests found.</p>
              <Link
                to="/employee/absence"
                className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Create your first request
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">Your HR Messages</h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hrMessages.length > 0 ? (
            hrMessages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))
          ) : (
            <div className="col-span-full text-center py-6 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No HR messages found.</p>
              <Link
                to="/employee/hr-message"
                className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Send your first message
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;