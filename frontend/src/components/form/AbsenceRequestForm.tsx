import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useRequests } from '../../context/RequestContext';
import { useNavigate } from 'react-router-dom';

const AbsenceRequestForm: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [absenceType, setAbsenceType] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addAbsenceRequest } = useRequests();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!startDate) newErrors.startDate = 'Start date is required';
    if (!endDate) newErrors.endDate = 'End date is required';
    if (!absenceType) newErrors.absenceType = 'Absence type is required';
    
    // Check if end date is after start date
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    // Check if start date is in the future
    if (startDate && new Date(startDate) < new Date()) {
      newErrors.startDate = 'Start date must be in the future';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      addAbsenceRequest({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        absenceType,
      });
      
      // Show success animation
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting absence request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Request Absence</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Submit your absence request for approval. Please provide all required information.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="start-date"
                  className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                    errors.startDate ? 'border-red-300' : ''
                  }`}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              {errors.startDate && (
                <p className="mt-2 text-sm text-red-600">{errors.startDate}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="end-date"
                  className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                    errors.endDate ? 'border-red-300' : ''
                  }`}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              {errors.endDate && (
                <p className="mt-2 text-sm text-red-600">{errors.endDate}</p>
              )}
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="absence-type" className="block text-sm font-medium text-gray-700">
                Absence Type / Reason
              </label>
              <div className="mt-1">
                <textarea
                  id="absence-type"
                  rows={3}
                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.absenceType ? 'border-red-300' : ''
                  }`}
                  placeholder="Please describe the reason for your absence..."
                  value={absenceType}
                  onChange={(e) => setAbsenceType(e.target.value)}
                />
              </div>
              {errors.absenceType && (
                <p className="mt-2 text-sm text-red-600">{errors.absenceType}</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Brief description of your absence (e.g., "Vacation", "Sick Leave", "Personal Day")
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AbsenceRequestForm;