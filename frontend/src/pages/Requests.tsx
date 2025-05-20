import React, { useState } from 'react';
import './Requests.css';

interface Request {
  id: number;
  name: string;
  message: string;
  date: string;
  status: 'pending' | 'replied';
  reply?: string;
}

const Requests: React.FC = () => {
  // Static data for requests
  const initialRequests: Request[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      message: "I would like to request a day off next Friday for a family event.",
      date: "2024-03-15",
      status: "pending"
    },
    {
      id: 2,
      name: "Michael Chen",
      message: "Can I get approval for my overtime hours from last week?",
      date: "2024-03-14",
      status: "replied",
      reply: "Approved. Please submit the timesheet by end of day."
    },
    {
      id: 3,
      name: "Emma Wilson",
      message: "Requesting information about the new health insurance policy.",
      date: "2024-03-13",
      status: "pending"
    },
    {
      id: 4,
      name: "David Brown",
      message: "Need to discuss my performance review from last month.",
      date: "2024-03-12",
      status: "replied",
      reply: "Let's schedule a meeting next week to discuss this."
    }
  ];

  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = (requestId: number) => {
    if (!replyText.trim()) return;

    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: 'replied', reply: replyText }
        : request
    ));
    setReplyText('');
    setSelectedRequest(null);
  };

  return (
    <div className="requests-container">
      <h1>Employee Requests</h1>
      
      <div className="requests-list">
        {requests.map(request => (
          <div key={request.id} className="request-card">
            <div className="request-header">
              <h3>{request.name}</h3>
              <span className={`status ${request.status}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
            
            <div className="request-content">
              <p className="message">{request.message}</p>
              <p className="date">Date: {request.date}</p>
              
              {request.status === 'replied' && request.reply && (
                <div className="reply-section">
                  <h4>Your Reply:</h4>
                  <p>{request.reply}</p>
                </div>
              )}
              
              {request.status === 'pending' && (
                <div className="reply-form">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={3}
                  />
                  <button 
                    onClick={() => handleReply(request.id)}
                    className="reply-button"
                  >
                    Send Reply
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests; 