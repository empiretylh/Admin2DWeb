import React, { useMemo, useState } from "react";
import { IMAGE } from "../config/image";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { getEtsdata, getGiftImage } from "../server/api";

const ETSScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null); // For previewing the image
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { gifttype } = useParams();

  const ets_data = useQuery("ets_datad", getEtsdata);

  const data = useMemo(() => {
    if (ets_data.data) {
      return ets_data?.data?.data;
    }
  }, [ets_data?.data]);

  // Handle image upload function
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("img", file); // 'img' is the key used in the backend for image

    try {
      setLoading(true);

      const response = await axios.post("/api/gift/ets/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progress);
        },
      });

      console.log("Upload success", response.data);
      // Refetch or update data as needed
      ets_data.refetch();
    } catch (error) {
      console.error("Upload error", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file)); // Set preview image
    uploadImage(file); // Upload the selected image
  };

  return (
    <div className="" key={gifttype}>
      <nav className="bg-green-700 p-3 flex flex-row gap-2 ">
        <img src={IMAGE.logo} className="w-5" />
        <h1 className="font-bold text-white">Estimate Thai Stock</h1>
      </nav>

      <div className="flex flex-col items-center mt-4 p-5">
        {/* Container for buttons and image */}
        <div className="flex flex-col md:flex-row gap-3 w-full">
          {/* Buttons */}
          <div className="flex flex-col md:flex-col gap-3 w-full md:w-1/2">
            {/* File Input for Uploading Image */}
            <label className="bg-green-700 w-full text-white text-md font-bold p-3 rounded-lg hover:bg-green-600 text-center cursor-pointer">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden" // Hide the default input
              />
            </label>

            {/* <button className="bg-green-700 w-full text-white text-md font-bold p-3 rounded-lg hover:bg-green-600">
              Send Notification
            </button> */}
          </div>

          {/* Image Preview */}
          <div className="w-full md:w-1/2">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full mt-5 md:mt-0"
              />
            ) : (
              <img
                src={axios.defaults.baseURL + data?.image}
                className="w-full mt-5 md:mt-0"
              />
            )}
          </div>
        </div>

        {/* Upload Progress */}
        {loading && (
          <div className="w-full md:w-1/2">
            <p>Uploading: {progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ETSScreen;
