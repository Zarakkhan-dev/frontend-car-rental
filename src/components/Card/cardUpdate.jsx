import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCardByIdQuery, useUpdateCardMutation } from '../../store/slices/cardsApiSlice';

const CardUpdate = () => {
  const { id } = useParams(); // Get the card ID from the URL
  const navigate = useNavigate(); // To redirect after update
  const { data: cardData, error: fetchError, isLoading } = useGetCardByIdQuery(id); // Fetch card by ID
  const [updateCard] = useUpdateCardMutation();

  // Initial form state
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

  // Pre-fill the form when the cardData is available
  useEffect(() => {
    if (cardData) {
      console.log("Fetched card data:", cardData); // Log to check if data is fetched correctly
      setFormData({
        bank_name: cardData.bank_name || '',
        holder_name: cardData.holder_name || '',
        card_number: cardData.card_number || '',
        card_charge: cardData.card_charge || '',
        due_date: cardData.due_date ? cardData.due_date.split('T')[0] : '', // Convert to YYYY-MM-DD format
        year_fee: cardData.year_fee || '',
        status: cardData.status || '',
        paid_amount: cardData.paid_amount || '',
        extra_pay: cardData.extra_pay || '',
        less_pay: cardData.less_pay || '',
      });
    }
  }, [cardData]); // Re-run the effect when cardData changes

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationError) setValidationError(''); // Clear validation error on input change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: Check if any field is empty
    if (Object.values(formData).some((value) => !value.trim())) {
      setValidationError('All fields are required');
      return;
    }

    try {
      await updateCard({ id, data: formData }).unwrap();
      setFormData(initialState); // Reset the form after submission
      navigate('/card-list'); // Redirect to the list of cards after update
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (isLoading) return <p>Loading card data...</p>;
  if (fetchError) return <p className="text-red-600">Error fetching card data.</p>;

  return (
    <div className="p-6 bg-gray-200 shadow-md rounded-lg w-full">
      <div className="w-full h-56 overflow-hidden rounded-md relative mb-6">
        <img
          src="https://enews.hamariweb.com/wp-content/uploads/2023/12/Meezan-Bank-Debit-Card.jpg"
          alt="Card"
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
                value={formData.due_date || ''} // Ensure value is properly set
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md outline-none"
              />
            ) : field === 'status' ? (
              <select
                name={field}
                value={formData[field] || ''} // Ensure value is properly set
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md outline-none"
              >
                <option value="">Select status</option>
                <option value="Active">paid</option>
                <option value="Inactive">pending</option>
                <option value="paid">overdue</option> {/* Adjust options if needed */}
              </select>
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field] || ''} // Ensure value is properly set
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md outline-none"
              />
            )}
          </div>
        ))}
        <div className="grid grid-cols-1 mt-4">
          <button
            type="submit"
            className="w-full bg-[#192236] text-white py-2 rounded-md font-semibold"
          >
            Update Card Details
          </button>
        </div>
      </form>
      {validationError && <p className="text-red-600 mt-2">{validationError}</p>}
    </div>
  );
};

export default CardUpdate;
