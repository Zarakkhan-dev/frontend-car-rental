import React, { useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

function CarDetailsForm() {
  // Simulating data tables for makes, models, and variants
  // const makes = ['Toyota', 'Ford', 'Honda'];
  // const models = {
  //   Toyota: ['Camry', 'Corolla', 'Rav4'],
  //   Ford: ['Fiesta', 'Focus', 'Explorer'],
  //   Honda: ['Civic', 'Accord', 'CR-V'],
  // };
  // const variants = {
  //   Camry: ['LE', 'SE', 'XLE'],
  //   Corolla: ['L', 'LE', 'XSE'],
  //   Fiesta: ['S', 'SE', 'Titanium'],
  //   // Add variants for other models as needed
  // };

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    variant: '',
    registration_no: '',
    insurance: null,
    id_card: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add submit logic here
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {/* Image Header */}
   

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 bg-gray-200 rounded-md shadow-lg w-full ">
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
            <span>
              <AiOutlineExclamationCircle />
            </span>
            Car Details
          </h1>
          <div className="border-b border-gray-500 mt-1"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-gray-500 font-medium">Make</label>
              <input
                name="make"
                value={formData.make}
                onChange={(e) => {
                  handleChange(e);
                  setFormData((prevData) => ({ ...prevData, model: '', variant: '' })); // Reset model and variant
                }}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                required
              >
                {/* <option value="">Select Make</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))} */}
              </input>
            </div>

            {/* {formData.make && ( */}
              <div>
                <label className="block text-gray-500 font-medium">Model</label>
                <input
                  name="model"
                  value={formData.model}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData((prevData) => ({ ...prevData, variant: '' })); // Reset variant
                  }}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                  required
                >
                  {/* <option value="">Select Model</option>
                  {models[formData.make]?.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))} */}
                </input>
              </div>
            {/* )} */}

            {/* {formData.model && variants[formData.model] && ( */}
              <div>
                <label className="block text-gray-500 font-medium">Variant</label>
                <input
                  name="variant"
                  value={formData.variant}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                  required
                >
                  {/* <option value="">Select Variant</option>
                  {variants[formData.model].map((variant) => (
                    <option key={variant} value={variant}>
                      {variant}
                    </option>
                  ))} */}
                </input>
              </div>
            {/* )} */}

            <div>
              <label className="block text-gray-500 font-medium">Registration Number</label>
              <input
                type="text"
                name="registration_no"
                value={formData.registration_no}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-500 font-medium">Insurance Document</label>
            <input
              type="file"
              name="insurance"
              onChange={handleChange}
              className="w-full mt-1 p-2 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500 font-medium">Owner's ID Card</label>
            <input
              type="file"
              name="id_card"
              onChange={handleChange}
              className="w-full mt-1 p-2"
              required
            />
          </div>

          <button type="submit" className="w-full bg-[#192236] text-white py-2 rounded-md mt-4">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CarDetailsForm;
