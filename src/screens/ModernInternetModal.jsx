import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { postModernInternet } from '../server/api';

const ModalInternetModal = ({ visible, onClose, onFinish = () => {} }) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const [modern930, setModern930] = useState('');
  const [internet930, setInternet930] = useState('');
  const [modern200, setModern200] = useState('');
  const [internet200, setInternet200] = useState('');

  const queryUpdate = useMutation(postModernInternet, {
    onMutate: () => setLoading(true),
    onSuccess: () => {
      setLoading(false);
      setModern930('');
      setInternet930('');
      setModern200('');
      setInternet200('');
    },
    onError: () => {
      setLoading(false);
    },
  });

  const handleUpdate = (modern, internet, hours, minutes) => {
    const d = new Date();
    d.setHours(hours, minutes, 0);

    queryUpdate.mutate({
      modern,
      internet,
      date: d,
    });
  };
  if (!visible) return null;

  return (
    <div className="absolute w-full h-full  bg-gray-600 bg-opacity-50 flex items-center justify-center">
       <div className="bg-white rounded-lg shadow-lg w-full md:w-1/2 p-6 ">
        <div className="flex items-center mb-5">
          <button
            onClick={onClose}
            className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
          >
            &larr;
          </button>
          <h2 className="text-xl font-bold text-center text-gray-900 flex-1">
            Change Modern, Internet
          </h2>
        </div>
        {loading && (
          <div className="w-full md:w-1/2">
            <p>Uploading: {progress}%</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          
        {/* Modern 9:30 */}
        <div className="mb-5">
          <label className="block text-lg font-bold text-gray-900 mb-2">Modern - 9:30</label>
          <input
            type="number"
            value={modern930}
            onChange={(e) => setModern930(e.target.value)}
            placeholder="Modern"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Internet 9:30 */}
        <div className="mb-5">
          <label className="block text-lg font-bold text-gray-900 mb-2">Internet - 9:30</label>
          <input
            type="text"
            value={internet930}
            onChange={(e) => setInternet930(e.target.value)}
            placeholder="Internet"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
     
        <button
          onClick={() => handleUpdate(modern930, internet930, 9, 30)}
          className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg mt-3"
        >
          UPDATE 9:30 AM
        </button>
        </div>

        <div>


        {/* Modern 2:00 */}
        <div className="mb-5">
          <label className="block text-lg font-bold text-gray-900 mb-2">Modern - 2:00</label>
          <input
            type="number"
            value={modern200}
            onChange={(e) => setModern200(e.target.value)}
            placeholder="Modern"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Internet 2:00 */}
        <div className="mb-5">
          <label className="block text-lg font-bold text-gray-900 mb-2">Internet - 2:00</label>
          <input
            type="text"
            value={internet200}
            onChange={(e) => setInternet200(e.target.value)}
            placeholder="Internet"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          onClick={() => handleUpdate(modern200, internet200, 14, 0)}
          className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg mt-3"
        >
          UPDATE 2:00 PM
        </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ModalInternetModal;
