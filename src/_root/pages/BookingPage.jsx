import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingForm from "../../components/Carallocation/BookingForm";
import AddCarConditionForm from "../../components/Carallocation/AddCarConditionForm";
import {
	useCreateCarConditionMutation,
	useGetCarsQuery,
} from "../../redux/slices/carsApiSlice";
import { useGetCustomersQuery } from "../../redux/slices/customersApiSlice";
import Loader from "../../components/shared/Loader";
import NoDataFoundMessage from "../../components/shared/NoDataFoundMessage";
import { useCreateBookingMutation } from "../../redux/slices/bookingsApiSlice";
import MediaUploader from "../../components/Carallocation/MediaUploader";

const BookingPage = () => {
	const [formData, setFormData] = useState({
		carId: "",
		customerId: "",
		rentalStartDate: "",
		rentalEndDate: "",
		initialMileage: "",
		totalPrice: "",
		conditionType: "",
	});

	const [imageUrls, setImageUrls] = useState([]); 
	const [videoUrls, setVideoUrls] = useState([]);

	const { data: cars, isLoading: carsLoading } = useGetCarsQuery({});
	const { data: customers, isLoading: customerLoading } = useGetCustomersQuery({});

	const [createBooking] = useCreateBookingMutation();
	const [createCarCondition] = useCreateCarConditionMutation();

	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log(formData);
		try {
			const bookingData = {
				carId: formData.carId,
				customerId: formData.customerId,
				rentalStartDate: formData.rentalStartDate,
				rentalEndDate: formData.rentalEndDate,
				initialMileage: formData.initialMileage,
			};

			const carConditionData = {
				carId: formData.carId,
				conditionType: formData.conditionType,
				imageUrls,
				videoUrls,
			};

			console.log(bookingData);
			console.log(carConditionData);

			const booking = await createBooking(bookingData).unwrap();

			if (booking) {
				await createCarCondition(carConditionData).unwrap();
			}

			toast.success("Car Allocation added successfully!");
			setFormData({
				carId: "",
				customerId: "",
				rentalStartDate: "",
				rentalEndDate: "",
				initialMileage: "",
			});
			event.target.reset();
		} catch (error) {
			console.error("Error adding car allocation:", error);
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

	return carsLoading || customerLoading ? (
		<Loader />
	) : cars && customers && cars?.doc && customers?.doc ? (
		<div className="bg-ground rounded-sm p-4 text-gray-800">
			<form onSubmit={handleSubmit}>
				<BookingForm
					cars={cars?.doc}
					customers={customers?.doc}
					formData={formData}
					handleInputChange={handleInputChange}
				/>

				<AddCarConditionForm
					formData={formData}
					handleInputChange={handleInputChange}
				/>

				<MediaUploader
					imageUrls={imageUrls}
					setImageUrls={setImageUrls}
					videoUrls={videoUrls}
					setVideoUrls={setVideoUrls}
				/>

				<div className="flex justify-end">
					<button
						type="submit"
						className="py-2 px-4 bg-gray-900 text-white text-lg rounded-md flex-end"
					>
						Add Booking
					</button>
				</div>
			</form>
		</div>
	) : (
		<NoDataFoundMessage message="Cars or Customers data not found." />
	);
};

export default BookingPage;
