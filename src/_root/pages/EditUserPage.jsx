import { useEffect, useState } from "react";
import {
	useRegisterMutation,
	useRegisterAddressMutation,
	useGetUserDetailsQuery,
} from "../../redux/slices/usersApiSlice";
import { useCreateCardMutation } from "../../redux/slices/cardsApiSlice";
import uploadImage from "../../helpers/imageUpload";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../shared/Loader";
import EditUserForm from "../../components/Vendor/EditUserForm";
import { toast } from "react-toastify";

const EditUserPage = () => {
	const { id } = useParams();

	const { data: user, isLoading } = useGetUserDetailsQuery(id);

	const [selectedDate, setSelectedDate] = useState("");
	const [imageLoading, setImageLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		if (user) {
			setImageUrl(user.image);
		}
	}, [user]);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		phoneNumber: "",
		status: "active",
		registrationDate: "",
		image: "",
		address: "",
		city: "",
		zip_Code: "",
		state: "",
		cnic: "",
		ownerType: "user",
		cardHolderName: "",
		cardNumber: "",
		expiryDate: "",
		cvv: "",
		billingAddress: "",
	});

	const [register] = useRegisterMutation();
	const [registerAddress] = useRegisterAddressMutation();
	const [createCard] = useCreateCardMutation();

	const navigate = useNavigate();

	const handleDateChange = (event) => {
		setSelectedDate(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(formData);

		try {
			// Prepare data for user registration
			const userData = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
				phoneNumber: formData.phoneNumber,
				status: formData.status,
				registrationDate: selectedDate,
				image: imageUrl,
				cnic: formData.cnic,
			};

			console.log(userData);

			const userResponse = await register(userData).unwrap();
			console.log("User registered successfully:", userResponse);

			const userId = userResponse.doc[0].id;

			if (!userId) {
				throw new Error("User ID is missing in the response.");
			}

			const addressData = {
				userId: userId,
				address: formData.address,
				city: formData.city,
				zipCode: formData.zip_Code,
				state: formData.state,
			};

			// Register address
			await registerAddress(addressData).unwrap();

			const cardData = {
				ownerId: userId,
				ownerType: formData.ownerType,
				cardHolderName: formData.cardHolderName,
				cardNumber: formData.cardNumber,
				expiryDate: formData.expiryDate,
				cvv: formData.cvv,
				billingAddress: formData.billingAddress,
			};

			console.log("Creating card with data:", cardData);
			try {
				await createCard(cardData).unwrap();
				toast.success("User, address, and card added successfully!");
			} catch (error) {
				console.error("Error creating card:", error);
				toast.error("Failed to create card!");
			}

			navigate("/users");

			setFormData({
				name: "",
				email: "",
				password: "",
				phoneNumber: "",
				status: "active",
				registrationDate: "",
				address: "",
				city: "",
				zip_Code: "",
				state: "",
				cnic: "",
				ownerType: "user",
				cardHolderName: "",
				cardNumber: "",
				expiryDate: "",
				cvv: "",
				billingAddress: "",
			});
			event.target.reset();
		} catch (error) {
			console.error("Error adding user, address, or card:", error);
			toast.error(error.data.message);
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleImageUpload = async (event) => {
		const uploadedImage = event.target.files[0];
		if (uploadedImage) {
			try {
				setImageLoading(true);
				const url = await uploadImage(uploadedImage, "car-rental-data");
				console.log(url);
				setImageLoading(false);
				setImageUrl(url);
			} catch (error) {
				console.error("Error uploading image:", error);
				toast.error("Image upload failed!");
			}
		}
	};

	return (
		<EditUserForm
			handleImageUpload={handleImageUpload}
			handleInputChange={handleInputChange}
			imageLoading={imageLoading}
			handleSubmit={handleSubmit}
		/>
	);
};

export default EditUserPage;
