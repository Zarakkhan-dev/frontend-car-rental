import { useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useCreateCarMutation } from '../../store/slices/carsApiSlice';

function CarDetailsForm() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    variant: '',
    registration_no: '',
    insurance_url: '',
    id_card_url: '',
  });

  const [createCar, { isLoading, isError, error }] = useCreateCarMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      make: formData.make,
      model: formData.model,
      variant: formData.variant,
      registration_no: formData.registration_no,
      documents: {
        insurance: formData.insurance_url,
        id_card: formData.id_card_url, 
      },
    };

    try {
      await createCar(payload).unwrap();
      alert('Car details submitted successfully!');
    } catch (err) {
      console.error('Failed to submit car details:', err);
      alert('Error submitting car details');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-200 rounded-md shadow-lg w-full"
      >
        <div className="w-full h-56 overflow-hidden rounded-md relative mb-6">
          <img
            src="https://deinfa.com/wp-content/uploads/2024/09/Corolla-vs-Civic-Which-is-the-Best-Compact-Car-in-2024-Featured-Image.jpg"
            alt="Car"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
            Select Your Car!
          </div>
        </div>

        <h1 className="text-base text-gray-600 font-bold flex items-center gap-1">
          <AiOutlineExclamationCircle />
          Car Details
        </h1>
        <div className="border-b border-gray-500 mt-1"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-500 font-medium">Make</label>
            <input
              name="make"
              value={formData.make}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-500 font-medium">Model</label>
            <input
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-500 font-medium">Variant</label>
            <input
              name="variant"
              value={formData.variant}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-500 font-medium">
              Registration Number
            </label>
            <input
              name="registration_no"
              value={formData.registration_no}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-500 font-medium">
              Insurance Document Link
            </label>
            <input
              type="text"
              name="insurance_url"
              value={formData.insurance_url}
              onChange={handleChange}
              placeholder="Enter file link"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-500 font-medium">
              ID Card Document Link
            </label>
            <input
              type="text"
              name="id_card_url"
              value={formData.id_card_url}
              onChange={handleChange}
              placeholder="Enter file link"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#192236] text-white py-2 rounded-md mt-4"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        {isError && (
          <p className="text-red-500 mt-2">
            {error?.data?.message || 'Submission failed'}
          </p>
        )}
      </form>
    </div>
  );
}

export default CarDetailsForm;
