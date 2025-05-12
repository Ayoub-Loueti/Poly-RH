export interface AbsenceRequest {
    id: string;
    startDate: Date;
    endDate: Date;
    absenceType: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
  }
  
  export interface HRMessage {
    id: string;
    message: string;
    status: 'pending' | 'read' | 'responded';
    createdAt: Date;
  }
  
  export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  }