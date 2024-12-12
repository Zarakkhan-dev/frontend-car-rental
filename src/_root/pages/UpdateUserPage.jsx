import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetUserDetailsQuery,
  useGetUserAddressDetailsQuery,
} from "../../redux/slices/usersApiSlice";
import {
  useUpdateUserMutation,
  useUpdateUserAddressMutation,
} from "../../redux/slices/usersApiSlice";
import Loader from "../../components/shared/Loader";
import NoDataFoundMessage from "../../components/shared/NoDataFoundMessage";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import uploadImage from "../../helpers/imageUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUserPage = () => {
  const { id } = useParams();
  const { data: user, isLoading: isUserLoading } = useGetUserDetailsQuery(id);
  const { data: userAddress, isLoading: isAddressLoading } =
    useGetUserAddressDetailsQuery(id);

  const [updateUser, { isLoading: isSubmittingUser }] = useUpdateUserMutation();
  const [updateUserAddress, { isLoading: isSubmittingAddress }] =
    useUpdateUserAddressMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    status: "",
    registrationDate: "",
    image: "",
    address: "",
    city: "",
    zip_Code: "",
    state: "",
    cnic: "",
    ownerType: "user",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (user?.doc) {
      setFormData({
        ...formData,
        name: user.doc.name,
        email: user.doc.email,
        phoneNumber: user.doc.phoneNumber,
        status: user.doc.status,
        registrationDate: user.doc.registrationDate,
        image: user.doc.image,
        address: userAddress?.doc?.address || "",
        city: userAddress?.doc?.city || "",
        zip_Code: userAddress?.doc?.zip_Code || "",
        state: userAddress?.doc?.state || "",
      });
      setImageUrl(user.doc.image);
    }
  }, [user, userAddress]);

  const validateForm = () => {
    let formErrors = {};
  
    if (!formData.name?.trim()) formErrors.name = "Name is required";
    if (!formData.email?.trim()) formErrors.email = "Email is required";
    if (!formData.phoneNumber?.trim()) formErrors.phoneNumber = "Phone number is required";
  
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleStatusChange = (e) => {
    setFormData({ ...formData, status: e.target.checked ? "active" : "inactive" });
  };

  const handleImageUpload = async (event) => {
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      try {
        setImageLoading(true);
        const url = await uploadImage(uploadedImage, "user-data");
        setImageLoading(false);
        setImageUrl(url);
        setFormData({ ...formData, image: url });
        toast.success("Image uploaded successfully!");
      } catch (error) {
        setImageLoading(false);
        console.error("Error uploading image:", error);
        toast.error("Image upload failed.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const numericId = parseInt(id, 10);

    try {
      await updateUser({
        id: numericId,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        status: formData.status,
        registrationDate: formData.registrationDate,
        image: formData.image,
      }).unwrap();

      await updateUserAddress({
        userId: numericId,
        address: formData.address,
        city: formData.city,
        zip_Code: formData.zip_Code,
        state: formData.state,
      }).unwrap();

      setMessage("User details updated successfully!");
      toast.success("User details updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error);
      setMessage("Failed to update user details.");
      toast.error("Failed to update user details.");
    }
  };

  if (isUserLoading || isAddressLoading) return <Loader />;

  if (!user || !user.doc)
    return <NoDataFoundMessage message="User data not found." />;

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Update User</h1>
      </div>
      {message && <p className="text-center text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">User Information</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone:</label>
            <PhoneInput
              inputProps={{ name: "phoneNumber", required: true, placeholder: "Enter phone number" }}
              country={"us"}
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              containerClass="w-full"
            />
            {errors.phoneNumber && <p className="text-red-500 mt-1">{errors.phoneNumber}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Image:</label>
            {imageLoading ? (
              <div>Loading...</div>
            ) : imageUrl ? (
              <img src={imageUrl} alt="User" className="w-40 h-32 object-cover" />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border border-gray-300 p-2 w-full rounded"
              />
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Information</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Address Information</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ZIP Code:</label>
            <input
              type="text"
              name="zip_Code"
              value={formData.zip_Code}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={formData.status === "active"}
              onChange={handleStatusChange}
              className="form-checkbox"
            />
            <span className="ml-2">Active</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isSubmittingUser || isSubmittingAddress || imageLoading}
        >
          {isSubmittingUser || isSubmittingAddress ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserPage;
