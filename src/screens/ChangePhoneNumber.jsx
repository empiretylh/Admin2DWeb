import React, { useState, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { deletePhoneNumber, getPhoneNumber, postPhoneNumber } from "../server/api";

export const ChangePhoneNumberModal = ({ visible, onClose, onFinish = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [modern930, setmodern930] = useState("");

  const { data: phoneNumbersData, refetch } = useQuery("phonenumber", getPhoneNumber);

  const phoneNumbers = useMemo(() => {
    return phoneNumbersData?.data || [];
  }, [phoneNumbersData]);

  const QueryUpdate = useMutation(postPhoneNumber, {
    onMutate: () => setLoading(true),
    onSuccess: () => {
      setLoading(false);
      setmodern930("");
      refetch();
    },
    onError: () => {
      setLoading(false);
      refetch();
    },
  });

  const QueryDelete = useMutation(deletePhoneNumber, {
    onMutate: () => setLoading(true),
    onSuccess: () => {
      setLoading(false);
      refetch();
    },
    onError: () => setLoading(false),
  });

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full md:w-1/3 p-6 relative">
        {/* <LoadingModal show={loading} setShow={setLoading} /> */}
        
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          {/* <Icon.IoClose size={24} /> */}
          X
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Change Phone Number</h2>
        {loading && (
          <div className="w-full md:w-1/2">
            <p>loading</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Add Phone Number</label>
          <input
            type="tel"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Phone Number"
            value={modern930}
            onChange={(e) => setmodern930(e.target.value)}
          />
        </div>

        {/* Update Button */}
        <button
          onClick={() => {
            QueryUpdate.mutate({ phno: modern930 });
          }}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-400"
        >
          UPDATE
        </button>

        {/* Existing Phone Numbers */}
        <div className="mt-6">
          {phoneNumbers?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg"
            >
              <span className="text-gray-800">{item.phno}</span>
              <button
                onClick={() => QueryDelete.mutate({ id: item.id })}
                className="text-red-500 hover:text-red-700"
              >
                {/* <Icon.IoTrash size={20} /> */}
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
