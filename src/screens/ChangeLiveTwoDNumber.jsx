import React, { useState, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { postLiveTwoD } from "../server/api";


export const ChangeLiveTwoDNumber = ({
  visible,
  onClose,
  onFinish = () => {},
}) => {
  const [progress, setProgress] = useState();
  const [loading, setLoading] = useState(false);

  const [modern930, setmodern930] = useState("");
  const [internet930, setinternet930] = useState("");

  const QueryUpdate = useMutation(postLiveTwoD, {
    onMutate: (e) => setLoading(true),
    onSuccess: () => {
      setLoading(false);
      setmodern930("");
      setinternet930("");
    },
    onError: () => {
      setLoading(false);
    },
  });

  const handleUpdate = (number, hours, minutes) => {
    const d = new Date();
    d.setHours(hours, minutes, 0);
    QueryUpdate.mutate({ number, date: d });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full md:w-1/3 p-6 relative">
        {/* <LoadingModal show={loading} setShow={setLoading} /> */}

        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          {/* <Icon.IoClose size={24} /> */}X
        </button>

    
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
              <div className="text-white">Uploading...</div>
            </div>
          )}
          <div className="flex items-center mb-5">
            <h2 className="text-xl font-bold text-gray-900 flex-1 text-center">
              Change Live 2D Number
            </h2>
          </div>

          <div className="mb-5">
            <label className="block text-lg font-bold text-gray-900 mb-2">
              Live 2D Number - 12:01
            </label>
            <input
              type="number"
              value={modern930}
              onChange={(e) => setmodern930(e.target.value)}
              placeholder="Live 2D Number - 12:01"
              className="border border-green-600 bg-white rounded-lg p-3 w-full"
            />
            <button
              onClick={() => handleUpdate(modern930, 12, 1)}
              className="bg-green-600 text-white rounded-lg p-3 mt-3 w-full"
            >
              UPDATE
            </button>
          </div>

          <div>
            <label className="block text-lg font-bold text-gray-900 mb-2">
              Live 2D Number - 4:30
            </label>
            <input
              type="number"
              value={internet930}
              onChange={(e) => setinternet930(e.target.value)}
              placeholder="Live 2D Number - 4:30"
              className="border border-green-600 bg-white rounded-lg p-3 w-full"
            />
            <button
              onClick={() => handleUpdate(internet930, 4, 30)}
              className="bg-green-600 text-white rounded-lg p-3 mt-3 w-full"
            >
              UPDATE
            </button>
        </div>
      </div>
    </div>
  );
};
