// import React, { useState } from 'react';
// import { AiOutlineExclamationCircle } from 'react-icons/ai';
// import { useCreateCarMutation } from '../../store/slices/carsApiSlice';

// function CarDetailsForm() {
//   const [createCar] = useCreateCarMutation();

//   const [formData, setFormData] = useState({
//     make: '',
//     model: '',
//     variant: '',
//     registration_no: '',
//     insurance: null,
//     id_card: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // Add submit logic here
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center">
//         {/* Image Header */}
   

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 bg-gray-200 rounded-md shadow-lg w-full ">
//         <div className="w-full h-56 overflow-hidden rounded-md relative mb-6">
//             <img
//               src="https://deinfa.com/wp-content/uploads/2024/09/Corolla-vs-Civic-Which-is-the-Best-Compact-Car-in-2024-Featured-Image.jpg"
//               alt="Car"
//               className="object-cover w-full h-full"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
//               Select Your Car!
//             </div>
//           </div>
//           <h1 className="text-base text-gray-600 font-bold flex items-center gap-1">
//             <span>
//               <AiOutlineExclamationCircle />
//             </span>
//             Car Details
//           </h1>
//           <div className="border-b border-gray-500 mt-1"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//             <div>
//               <label className="block text-gray-500 font-medium">Make</label>
//               <input
//                 name="make"
//                 value={formData.make}
//                 onChange={(e) => {
//                   handleChange(e);
//                   setFormData((prevData) => ({ ...prevData, model: '', variant: '' })); // Reset model and variant
//                 }}
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
//                 required
//               >
            
//               </input>
//             </div>

           
//               <div>
//                 <label className="block text-gray-500 font-medium">Model</label>
//                 <input
//                   name="model"
//                   value={formData.model}
//                   onChange={(e) => {
//                     handleChange(e);
//                     setFormData((prevData) => ({ ...prevData, variant: '' })); // Reset variant
//                   }}
//                   className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
//                   required
//                 >
                 
//                 </input>
//               </div>
//             {/* )} */}

     
//               <div>
//                 <label className="block text-gray-500 font-medium">Variant</label>
//                 <input
//                   name="variant"
//                   value={formData.variant}
//                   onChange={handleChange}
//                   className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
//                   required
//                 >
                 
//                 </input>
//               </div>
//             {/* )} */}

//             <div>
//               <label className="block text-gray-500 font-medium">Registration Number</label>
//               <input
//                 type="text"
//                 name="registration_no"
//                 value={formData.registration_no}
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
//                 required
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-gray-500 font-medium">Insurance Document</label>
//             <input
//               type="file"
//               name="insurance"
//               onChange={handleChange}
//               className="w-full mt-1 p-2 outline-none"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-500 font-medium">Owner's ID Card</label>
//             <input
//               type="file"
//               name="id_card"
//               onChange={handleChange}
//               className="w-full mt-1 p-2"
//               required
//             />
//           </div>

//           <button type="submit" className="w-full bg-[#192236] text-white py-2 rounded-md mt-4">
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default CarDetailsForm;








import React, { useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useCreateCarMutation } from '../../store/slices/carsApiSlice';

function CarDetailsForm() {
  const [createCar, { isLoading, isError, isSuccess, error }] = useCreateCarMutation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await createCar(formDataToSend).unwrap();
      alert('Car details submitted successfully!');
      setFormData({
        make: '',
        model: '',
        variant: '',
        registration_no: '',
        insurance: null,
        id_card: null,
      });
    } catch (err) {
      console.error('Error submitting car details:', err);
      alert('Failed to submit car details. Please try again.');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
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
                  setFormData((prevData) => ({ ...prevData, model: '', variant: '' }));
                }}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-500 font-medium">Model</label>
              <input
                name="model"
                value={formData.model}
                onChange={(e) => {
                  handleChange(e);
                  setFormData((prevData) => ({ ...prevData, variant: '' }));
                }}
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
                required
              />
            </div>

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

          {isLoading && <p className="text-blue-500">Submitting...</p>}
          {isError && <p className="text-red-500">Error: {error?.data?.message || 'Submission failed'}</p>}

          <button
            type="submit"
            className="w-full bg-[#192236] text-white py-2 rounded-md mt-4"
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CarDetailsForm;
