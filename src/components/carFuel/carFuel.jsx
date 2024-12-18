import React, { useState, useEffect } from 'react';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useCreateFuelingMutation } from '../../store/slices/fuelingApiSlice';
import { useGetAllCarsQuery } from '../../store/slices/carsApiSlice';

const FuelingAndMaintenanceForm = () => {
  const [createFueling] = useCreateFuelingMutation();
  const { data: carsData, isLoading, isError, isSuccess, error } = useGetAllCarsQuery();
  console.log("carsData", carsData);

  // State for fueling
  const [fuelingData, setFuelingData] = useState({
    booking_id: '',
    customer_paid: false, // Changed to boolean
    verified: false,
    total_amount_paid: 0.0,
    remaining_amount_left: 0.0,
    bill_paid: false,
  });

  console.log("fueling data ", fuelingData);

  // Handle changes for fueling data
  const handleFuelingChange = (e) => {
    const { name, type, value, checked } = e.target;

    // Convert customer_paid to boolean correctly
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
      console.log(fuelingData);

      // Trigger the create fueling mutation
      const response = await createFueling({
        booking_id: fuelingData.booking_id,
        customer_paid: fuelingData.customer_paid, // Ensure it's boolean
        verified: fuelingData.verified,
        total_amount_paid: parseFloat(fuelingData.total_amount_paid), // Ensure it's a valid number
        remaining_amount_left: parseFloat(fuelingData.remaining_amount_left), // Ensure it's a valid number
        bill_paid: fuelingData.bill_paid
      }).unwrap();

      console.log("response of fueling", response);

      if (response.status === "success") {
        setFuelingData({
          booking_id: "",
          customer_paid: false, // Reset to default
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

        {/* Car Booking No */}
        <div className="col-span-1">
          <label className="block text-gray-500 font-medium">
            Car Booking No
          </label>
          <select
            name="booking_id"
            value={fuelingData.booking_id}
            onChange={handleFuelingChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
            required
          >
            <option value="">Select Registration No</option>
            {carsData?.data?.length > 0 ? (
              carsData.data.map((car) => (
                <option value={car.id} key={car.id}> {/* Changed to `car.id` for booking_id */}
                  {car.registration_no}
                </option>
              ))
            ) : (
              <option value="null">No cars found</option>
            )}
          </select>
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
      </form>
    </div>
  );
};

export default FuelingAndMaintenanceForm;
