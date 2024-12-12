import React, { useState } from 'react';
import { useSignupMutation } from '../../store/slices/userApiSlice';
import { useNavigate } from "react-router-dom";
function SignUpForm({ toggleAuth }) {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
    console.log(formData);
  };

  const handleSignUp = async(e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
     const response =  await signup({
        username: formData.fullName,
        email: formData.email,
        // phoneNumber: formData.phoneNumber,
        password: formData.password,
      }).unwrap();
      alert("Account created successfully!");
      console.log(response)
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error?.data?.message || "Signup failed. Please try again.");
    }
  }
  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <form onSubmit={handleSignUp} className="bg-gray-200 p-8 rounded-md shadow-lg w-full">
      <div className="w-full h-56 overflow-hidden rounded-md relative mb-6">
            <img
              src="https://media.istockphoto.com/id/1463013729/photo/online-registration-form-for-modish-form-filling.jpg?s=612x612&w=0&k=20&c=Fnx06haU4IHYLcRpy9Po_TBknvBqVjicGuUWkGu8e6Y="
              alt="Car"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
              Sign Up here!
            </div>
          </div>
        <h2 className="text-xl font-bold text-gray-600 mb-2 ">Sign Up</h2>
        <div className='border-b border-gray-500'></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 ">
          <div>
            <label className="block text-gray-500">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          </div>
         <div className='grid grid-cols-1'>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              className="mr-2"
              required
            />
            <label className="text-gray-500">I agree to the terms and conditions</label>
          </div>
          </div>

          <button type="submit" className="w-full bg-[#192236] text-white py-2 rounded-md mt-6">
            Sign Up
          </button>
        
        
        <div className="mt-4 text-center">
          <p className="text-gray-500">Already have an account? <a href="/login" className="text-blue-600" onClick={toggleAuth}>Sign In</a></p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
