import React from 'react';
import HRMessageForm from '../components/form/HRMessageForm';

const HRMessagePage: React.FC = () => {
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            HR Communication
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Send a message or inquiry to the HR department.
          </p>
        </div>
      </div>
      
      <HRMessageForm />
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="text-md font-medium text-blue-800">HR Contact Information</h4>
          <div className="mt-2 text-sm text-blue-700">
            <p>For urgent inquiries, please contact:</p>
            <p className="mt-1">Email: hr@company.com</p>
            <p>Phone: (555) 123-4567</p>
            <p className="mt-2">Office hours: Monday-Friday, 9:00 AM - 5:00 PM</p>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-md">
          <h4 className="text-md font-medium text-green-800">Common HR Requests</h4>
          <ul className="mt-2 list-disc pl-5 text-sm text-green-700 space-y-1">
            <li>Benefits information and enrollment</li>
            <li>Payroll questions</li>
            <li>Policy clarifications</li>
            <li>Training and development opportunities</li>
            <li>Workplace concerns</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HRMessagePage;