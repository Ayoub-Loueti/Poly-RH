import React from 'react';
import AbsenceRequestForm from '../components/form/AbsenceRequestForm';

const AbsenceRequestPage: React.FC = () => {
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Request Absence
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Submit a new absence request for approval by your manager.
          </p>
        </div>
      </div>
      
      <AbsenceRequestForm />
      
      <div className="mt-8 bg-blue-50 p-4 rounded-md">
        <h4 className="text-md font-medium text-blue-800">Absence Request Guidelines</h4>
        <ul className="mt-2 list-disc pl-5 text-sm text-blue-700 space-y-1">
          <li>Requests should be submitted at least 2 weeks in advance for planned absences</li>
          <li>For sick leave, please submit as soon as possible</li>
          <li>Attach any supporting documents when necessary</li>
          <li>Your request will be reviewed within 48 hours</li>
        </ul>
      </div>
    </div>
  );
};

export default AbsenceRequestPage;