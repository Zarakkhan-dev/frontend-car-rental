// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function UpdateCarForm() {
//   const { id } = useParams(); // Extract the ID from the URL
//   const navigate = useNavigate(); // To navigate back after form submission

//   // State to store car details
//   const [carDetails, setCarDetails] = useState({
//     make: "",
//     model: "",
//     variant: "",
//     registration_no: "",
//     insurance_document: "",
//     id_card_document: "",
//   });

//   const [loading, setLoading] = useState(true);

//   // Fetch car details for the given ID (dummy logic for now)
//   useEffect(() => {
//     // Replace this with an API call to fetch car details by ID
//     const dummyData = [
//       {
//         id: 1,
//         make: "Toyota",
//         model: "Corolla",
//         variant: "SE",
//         registration_no: "ABC123",
//         insurance_document: "https://example.com/insurance1.pdf",
//         id_card_document: "https://example.com/idcard1.pdf",
//       },
//       {
//         id: 2,
//         make: "Honda",
//         model: "Civic",
//         variant: "LX",
//         registration_no: "DEF456",
//         insurance_document: null,
//         id_card_document: "https://example.com/idcard2.pdf",
//       },
//       {
//         id: 3,
//         make: "Ford",
//         model: "Focus",
//         variant: "Titanium",
//         registration_no: "GHI789",
//         insurance_document: "https://example.com/insurance3.pdf",
//         id_card_document: null,
//       },
//     ];

//     const car = dummyData.find((item) => item.id === parseInt(id));
//     if (car) {
//       setCarDetails(car);
//     }
//     setLoading(false);
//   }, [id]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCarDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Replace this with an API call to update car details
//     console.log("Updated Car Details:", carDetails);

//     // Navigate back to the car list after updating
//     navigate("/");
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-700 mb-6">Update Car Details</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-600 mb-2">Make</label>
//           <input
//             type="text"
//             name="make"
//             value={carDetails.make}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-2">Model</label>
//           <input
//             type="text"
//             name="model"
//             value={carDetails.model}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-2">Variant</label>
//           <input
//             type="text"
//             name="variant"
//             value={carDetails.variant}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-2">Registration Number</label>
//           <input
//             type="text"
//             name="registration_no"
//             value={carDetails.registration_no}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-2">Insurance Document URL</label>
//           <input
//             type="url"
//             name="insurance_document"
//             value={carDetails.insurance_document}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-2">ID Card Document URL</label>
//           <input
//             type="url"
//             name="id_card_document"
//             value={carDetails.id_card_document}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
//         >
//           Update Car Details
//         </button>
//       </form>
//     </div>
//   );
// }

// export default UpdateCarForm;



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";

function UpdateCarForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    variant: "",
    registration_no: "",
    insurance: null,
    id_card: null,
  });

  useEffect(() => {
    // Fetch existing car details based on `id` and populate formData
    const fetchCarDetails = async () => {
      const response = await fetch(`/api/cars/${id}`); // Replace with actual API endpoint
      const data = await response.json();
      setFormData({
        make: data.make,
        model: data.model,
        variant: data.variant,
        registration_no: data.registration_no,
        insurance: data.insurance,
        id_card: data.id_card,
      });
    };

    fetchCarDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    await fetch(`/api/cars/${id}`, {
      method: "PUT", // Update method
      body: formDataToSend,
    });

    navigate("/"); // Redirect to the car list page after successful update
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
            Update Your Car Details
          </div>
        </div>
        <h1 className="text-base text-gray-600 font-bold flex items-center gap-1">
          <AiOutlineExclamationCircle /> Car Details
        </h1>
        <div className="border-b border-gray-500 mt-1"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-500 font-medium">Make</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={(e) => {
                handleChange(e);
                setFormData((prevData) => ({ ...prevData, model: "", variant: "" }));
              }}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500 font-medium">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={(e) => {
                handleChange(e);
                setFormData((prevData) => ({ ...prevData, variant: "" }));
              }}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500 font-medium">Variant</label>
            <input
              type="text"
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
          />
        </div>

        <div>
          <label className="block text-gray-500 font-medium">Owner's ID Card</label>
          <input
            type="file"
            name="id_card"
            onChange={handleChange}
            className="w-full mt-1 p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#192236] text-white py-2 rounded-md mt-4"
        >
          Update Car Details
        </button>
      </form>
    </div>
  );
}

export default UpdateCarForm;
