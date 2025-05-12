import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AbsenceRequest, HRMessage } from '../types';

interface RequestContextType {
  absenceRequests: AbsenceRequest[];
  hrMessages: HRMessage[];
  addAbsenceRequest: (request: Omit<AbsenceRequest, 'id' | 'status' | 'createdAt'>) => void;
  addHRMessage: (message: Omit<HRMessage, 'id' | 'status' | 'createdAt'>) => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const useRequests = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};

export const RequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [absenceRequests, setAbsenceRequests] = useState<AbsenceRequest[]>([
    {
      id: '1',
      startDate: new Date('2025-01-10'),
      endDate: new Date('2025-01-15'),
      absenceType: 'Vacation',
      status: 'approved',
      createdAt: new Date('2024-12-15')
    },
    {
      id: '2',
      startDate: new Date('2025-02-20'),
      endDate: new Date('2025-02-22'),
      absenceType: 'Sick Leave',
      status: 'pending',
      createdAt: new Date('2024-12-18')
    }
  ]);

  const [hrMessages, setHRMessages] = useState<HRMessage[]>([
    {
      id: '1',
      message: 'Request for team building activity approval',
      status: 'read',
      createdAt: new Date('2024-12-10')
    }
  ]);

  const addAbsenceRequest = (request: Omit<AbsenceRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: AbsenceRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date()
    };
    setAbsenceRequests((prev) => [newRequest, ...prev]);
  };

  const addHRMessage = (message: Omit<HRMessage, 'id' | 'status' | 'createdAt'>) => {
    const newMessage: HRMessage = {
      ...message,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date()
    };
    setHRMessages((prev) => [newMessage, ...prev]);
  };

  return (
    <RequestContext.Provider
      value={{
        absenceRequests,
        hrMessages,
        addAbsenceRequest,
        addHRMessage
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};