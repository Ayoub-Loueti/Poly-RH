import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useRequests } from '../../context/RequestContext';
import { useNavigate } from 'react-router-dom';

const HRMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addHRMessage } = useRequests();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      addHRMessage({ message });
      
      // Show success animation
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting HR message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Send Message to HR</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Submit your inquiry or request to the HR department. We'll get back to you as soon as possible.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="sm:col-span-6">
            <label htmlFor="hr-message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <div className="mt-1 relative">
              <div className="absolute top-3 left-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="hr-message"
                rows={6}
                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md pl-10 ${
                  errors.message ? 'border-red-300' : ''
                }`}
                placeholder="Type your message to HR here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {errors.message && (
              <p className="mt-2 text-sm text-red-600">{errors.message}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Be specific about your request or inquiry to help us assist you better.
            </p>
          </div>

          <div className="mt-5 flex justify-end">
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
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HRMessageForm;