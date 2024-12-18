import React, { useState } from "react";
import {  useUpdateDriverMutation } from "../../store/slices/driverApiSlice";

function updateDriverForm() {
  const [updateDriver, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverMutation();

  const [formData, setFormData] = useState({
    name: "",
    license: "",
    identity_card: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createDriver(formData).unwrap();
      
      if (response.status === "success") {
        setFormData({
          name: "",
          license: "",
          identity_card: "",
          phone_number: "",
        });
        alert("Driver details successfully added");
      } else {
        alert("Internal Error");
      }
    } catch (err) {
      console.error("Error submitting driver details:", err);
      alert("Failed to submit driver details. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-200 rounded-md shadow-lg w-full"
      >
        <h1 className="text-base text-gray-600 font-bold mb-4">Driver Details</h1>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-gray-500 font-medium">Driver Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500 font-medium">License</label>
            <input
              name="license"
              value={formData.license}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500 font-medium">Identity Card</label>
            <input
              name="identity_card"
              value={formData.identity_card}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-500 font-medium">Phone Number</label>
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
        </div>

        {isLoading && <p className="text-blue-500">Submitting...</p>}
        {isError && (
          <p className="text-red-500">
            Error: {error?.data?.message || "Submission failed"}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#192236] text-white py-2 rounded-md mt-4"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default updateDriverForm;
