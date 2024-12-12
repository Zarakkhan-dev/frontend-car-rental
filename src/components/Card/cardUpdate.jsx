

import React, { useState } from 'react';
import { useCreateCardMutation } from '../../store/slices/cardsApiSlice';

const CardUpdate = () => {
  const initialState = {
    bank_name: '',
    holder_name: '',
    card_number: '',
    card_charge: '',
    due_date: '',
    year_fee: '',
    status: '',
    paid_amount: '',
    extra_pay: '',
    less_pay: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [validationError, setValidationError] = useState('');
const [createCard] = useCreateCardMutation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationError) setValidationError(''); // Clear validation error on input change
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Basic validation: Check if any field is empty
    if (Object.values(formData).some((value) => !value.trim())) {
      setValidationError('All fields are required');
      return;
    }
    try {

      await createCard(formData).unwrap(); 
      setFormData(initialState);
      setValidationError('');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className=" p-6 bg-gray-200 shadow-md rounded-lg w-full ">
          <div className="w-full h-56 overflow-hidden rounded-md relative mb-6">
            <img
              src="https://enews.hamariweb.com/wp-content/uploads/2023/12/Meezan-Bank-Debit-Card.jpg"
              alt="Car"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
              Update your Card Details!
            </div>
          </div>
      <h2 className="text-base font-bold mb-1 text-gray-600">Card Details</h2>
      <div className="border-b border-gray-500"></div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {/* Render all fields */}
        {Object.keys(initialState).map((field) => (
          <div key={field}>
            <label className="block text-gray-500 font-medium capitalize">
              {field.replace('_', ' ')}
            </label>
            {field === 'due_date' ? (
              <input
                type="date"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md outline-none"
              />
            ) : field === 'status' ? (
              <select
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md outline-none"
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md outline-none"
              />
            )}
          </div>
        ))}
          </form>
        <div className='grid grid-cols-1 mt-4'>
        <button
          type="submit"
          className="w-full bg-[#192236] text-white py-2 rounded-md font-semibold"
          >
          Update Card Details
        </button>
        </div>
        {validationError && <p className="text-red-600 mt-2">{validationError}</p>}
          </div>
  );
};

export default CardUpdate;
