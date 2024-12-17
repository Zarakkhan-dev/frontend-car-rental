import React, { useState } from 'react';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useCreateFuelingMutation } from '../../store/slices/fuelingApiSlice';

const FuelingAndMaintenanceForm = () => {
  const [createFueling, { isLoading, isError, isSuccess, error }] = useCreateFuelingMutation();

  // State for fueling
  const [fuelingData, setFuelingData] = useState({
    booking_id: '',
    customer_paid: '', // Corrected field
    verified: false,
    total_amount_paid: 0.0,
    remaining_amount_left: 0.0,
    bill_paid: false,
  });

  // Handle changes for fueling data
  const handleFuelingChange = (e) => {
    const { name, type, value, checked } = e.target;
  
    // Convert customer_paid to boolean
    const processedValue =
      name === "customer_paid" ? (value === "Customer" ? true : false) : value;
  
    setFuelingData({
      ...fuelingData,
      [name]: type === "checkbox" ? checked : processedValue,
    });
  };
  

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Trigger the create fueling mutation
      console.log(fuelingData)
      const response = await createFueling({
        booking_id: fuelingData.booking_id,
        customer_paid: fuelingData.customer_paid_by, // Incorrect field name
        verified: fuelingData.verified,
        total_amount_paid: fuelingData.total_amount_paid,
        remaining_amount_left: fuelingData.remaining_amount_left,
        bill_paid: fuelingData.bill_paid
    }).unwrap();
    
    console.log("resonse of fuliling", response)

      if (response.status === "success") {
        setFuelingData({
          booking_id: "",
          customer_paid: "",
          verified: false,
          total_amount_paid: 0.0,
          remaining_amount_left: 0.0,
          bill_paid: false,
        });
        alert("Fueling details added successfully!");
      } else {
        alert("Failed to add fueling details.");
      }
    } catch (err) {
      console.error("Error submitting fueling data:", err);
      alert("Failed to submit fueling details. Please try again.");
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-200 shadow-lg rounded-lg w-full"
      >
        <div className="w-full h-56 overflow-hidden rounded-md relative mb-6">
          <img
            src="https://thumbs.dreamstime.com/b/woman-fueling-car-gas-station-safe-road-trip-ai-generated-woman-fueling-car-gas-station-safe-road-trip-328815440.jpg"
            alt="Car"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
            Car Fueling!
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-600 flex items-center gap-1">
          <AiOutlineExclamationCircle />
          Fueling Information
        </h2>
        <div className="border-b border-gray-500 mt-1"></div>

        {/* Booking ID */}
        <div>
          <label className="block text-gray-500 font-medium mt-2">Booking ID</label>
          <input
            type="text"
            name="booking_id"
            value={fuelingData.booking_id}
            onChange={handleFuelingChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Customer Paid */}
        <div>
          <label className="block text-gray-500 font-medium mt-2">Paid By</label>
          <select
  name="customer_paid"
  value={fuelingData.customer_paid ? "Customer" : "Owner"}
  onChange={handleFuelingChange}
  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
  required
>
  <option value="">Select</option>
  <option value="Customer">Customer</option>
  <option value="Owner">Owner</option>
</select>

        </div>

        {/* Verified */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            name="verified"
            checked={fuelingData.verified}
            onChange={handleFuelingChange}
            className="mr-2"
          />
          <label className="text-gray-500 font-medium">Verified</label>
        </div>

        {/* Total Amount Paid */}
        <div>
          <label className="block text-gray-500 font-medium mt-2">
            Total Amount Paid
          </label>
          <input
            type="number"
            name="total_amount_paid"
            value={fuelingData.total_amount_paid}
            onChange={handleFuelingChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            step="0.01"
            required
          />
        </div>

        {/* Remaining Amount Left */}
        <div>
          <label className="block text-gray-500 font-medium mt-2">
            Remaining Amount Left
          </label>
          <input
            type="number"
            name="remaining_amount_left"
            value={fuelingData.remaining_amount_left}
            onChange={handleFuelingChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            step="0.01"
            required
          />
        </div>

        {/* Bill Paid */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            name="bill_paid"
            checked={fuelingData.bill_paid}
            onChange={handleFuelingChange}
            className="mr-2"
          />
          <label className="text-gray-500 font-medium">Bill Paid</label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#192236] text-white py-2 rounded-md mt-4 font-semibold"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {isError && <p className="text-red-500 mt-2">{error?.data?.message || "Error occurred"}</p>}
        {isSuccess && <p className="text-green-500 mt-2">Fueling data submitted successfully!</p>}
      </form>
    </div>
  );
};

export default FuelingAndMaintenanceForm;
