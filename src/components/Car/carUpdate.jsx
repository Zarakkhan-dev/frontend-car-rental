import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useGetAllCarsQuery, useUpdateCarMutation } from "../../store/slices/carsApiSlice";

function UpdateCarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateCar] = useUpdateCarMutation();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    variant: "",
    registration_no: "",
    insurance: null,
    id_card: null,
  });

  // Fetch car details from the API
  const  { data: carDetails, error, isLoading } = useGetAllCarsQuery(id);
console.log("show update car details",carDetails);

  useEffect(() => {
    if (carDetails) {
      setFormData({
        make: carDetails.make,
        model: carDetails.model,
        variant: carDetails.variant,
        registration_no: carDetails.registration_no,
        insurance: carDetails.documents?.insurance || null,
        id_card: carDetails.documents?.id_card || null,
      });
    }
  }, [carDetails]);

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
    if (!carDetails.make || !carDetails.model || !carDetails.registration_no) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Send form data to the server
      await updateCar({ id, formData: formDataToSend }).unwrap();
      alert("Car details updated successfully!");
      navigate("/"); // Redirect on success
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Failed to update car details. Please try again.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading car details: {error.message}</p>;

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
              onChange={handleChange}
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
              onChange={handleChange}
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
          {formData.insurance && (
            <a
              href={`http://localhost:3000/uploads/${formData.insurance}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View current document
            </a>
          )}
          <input
            type="file"
            name="insurance"
            onChange={handleChange}
            className="w-full mt-1 p-2 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-500 font-medium">Owner's ID Card</label>
          {formData.id_card && (
            <a
              href={`http://localhost:3000/uploads/${formData.id_card}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View current document
            </a>
          )}
          <input
            type="file"
            name="id_card"
            onChange={handleChange}
            className="w-full mt-1 p-2 outline-none"
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
