import React, { useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useCreateBookingMutation } from '../../store/slices/bookingsApi';

function CarBookingForm() {
  const [createBooking] = useCreateBookingMutation();
  const [formData, setFormData] = useState({
    car_id: '',
    username: '',
    company_name: '',
    start_date: '',
    end_date: '',
    price_per_day: 0,
    price_per_month: 0,
    agreement: null,
    car_pictures: null,
    with_driver: false,
    driver_details: {
      id: '',
      name: '',
      license: '',
      identity_card_number: ''
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value
    }));
  };

  const handleDriverChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      driver_details: { ...prevData.driver_details, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const bookingData = { ...formData };
      const formDataToSend = new FormData();
      
      // Add form data to FormData object for file uploads
      Object.keys(bookingData).forEach((key) => {
        if (key === 'agreement' || key === 'car_pictures') {
          formDataToSend.append(key, bookingData[key]);
        } else {
          formDataToSend.append(key, bookingData[key]);
        }
      });

      // Call the mutation to create the booking
      const result = await createBooking(formDataToSend).unwrap();
      console.log('Booking created successfully:', result);
      // Optionally, handle successful form submission (e.g., show a success message)
    } catch (err) {
      console.error('Error creating booking:', err);
      // Optionally, handle errors (e.g., show an error message)
    }
  };

  return (
    <>
      <div className="flex justify-center ">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-gray-200 rounded-lg shadow-lg w-full  "
        >
          {/* Car Image */}
          <div className="w-full h-56 overflow-hidden rounded-md relative mb-6">
            <img
              src="https://deinfa.com/wp-content/uploads/2024/06/A-Guide-to-Electric-Cars-in-Pakistan-Featured-Image.png"
              alt="Car"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
              Book Your Car Now!
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-600 flex items-center gap-2">
            <AiOutlineExclamationCircle />
            Car Booking
          </h1>
          <div className="border-b border-gray-300 mt-2"></div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="col-span-1">
              <label className="block text-gray-500 font-medium">Car ID</label>
              <input
                type="text"
                name="car_id"
                value={formData.car_id}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block text-gray-500 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2 w-full md:w-[49%] ">
              <label className="block text-gray-500 font-medium">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-500 font-medium">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-500 font-medium">End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block text-gray-500 font-medium">Price per Day</label>
              <input
                type="number"
                name="price_per_day"
                value={formData.price_per_day}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-gray-500 font-medium">Price per Month</label>
              <input
                type="number"
                name="price_per_month"
                value={formData.price_per_month}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-500 font-medium">
              Agreement Document
            </label>
            <input
              type="file"
              name="agreement"
              onChange={handleChange}
              className="w-full mt-1 p-2"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-500 font-medium">Car Pictures</label>
            <input
              type="file"
              name="car_pictures"
              onChange={handleChange}
              className="w-full mt-1 p-2"
              required
            />
          </div>

          <div className="flex items-center  mt-4">
            <input
              type="checkbox"
              name="with_driver"
              checked={formData.with_driver}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-500 font-medium">With Driver</label>
          </div>

          {formData.with_driver && (
            <div className="mt-4 space-y-4">
              <h3 className="text-lg font-medium text-gray-500">Driver Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 font-medium">Booking ID</label>
                  <input
                    type="text"
                    name="id"
                    value={formData.driver_details.id}
                    onChange={handleDriverChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-500 font-medium">Driver Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.driver_details.name}
                    onChange={handleDriverChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-500 font-medium">Driver License</label>
                  <input
                    type="text"
                    name="license"
                    value={formData.driver_details.license}
                    onChange={handleDriverChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-500 font-medium">
                    Identity Card Number
                  </label>
                  <input
                    type="text"
                    name="identity_card_number"
                    value={formData.driver_details.identity_card_number}
                    onChange={handleDriverChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#192236] text-white py-2 rounded-md mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CarBookingForm;
