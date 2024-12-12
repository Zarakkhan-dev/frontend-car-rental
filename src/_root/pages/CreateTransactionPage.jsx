import { useState, useEffect } from "react";
import { FiInfo } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormSection from "../../components/Vendor/FormInput/FormSection";
import FormInput from "../../components/Vendor/FormInput/FormInput";
import FormSelect from "../../components/Vendor/FormInput/FormSelect";
import { useNavigate } from "react-router-dom";
import { useCreateTransactionMutation } from "../../redux/slices/transactionsApiSlice";
import { useGetBookingsQuery } from "../../redux/slices/bookingsApiSlice";
import { useGetCarsQuery } from "../../redux/slices/carsApiSlice";
const CreateTransactionPage = () => {
    const [formData, setFormData] = useState({
        customerId: "",
        ownerId: "", 
        bookingId: "",
        additionalCharges: "",
        rentalCharges: "",
        paymentMethod: "",
        paymentDate: "",
    });

    const [createTransaction] = useCreateTransactionMutation();
    const { data: bookingsData, isLoading: bookingsLoading, error: bookingsError } = useGetBookingsQuery({});
    const { data: carsData, isLoading: carsLoading, error: carsError } = useGetCarsQuery({});

    const bookings = bookingsData?.doc || [];
    const cars = carsData?.doc || [];

    useEffect(() => {
        console.log("Bookings Data:", bookingsData);
        console.log("Cars Data:", carsData);

    }, [bookingsData, carsData]);

    const customerIds = [...new Set(bookings.map(booking => booking.customerId))];
    const ownerIds = [...new Set(cars.map(car => car.ownerId))];
    const bookingIds = bookings.map(booking => booking.id);

    console.log("Customer IDs:", customerIds);
    console.log("Owner IDs:", ownerIds);
    console.log("Booking IDs:", bookingIds);

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const transactionData = {
                customerId: parseInt(formData.customerId, 10),
                ownerId: parseInt(formData.ownerId, 10),
                bookingId: parseInt(formData.bookingId, 10),
                additionalCharges: parseFloat(formData.additionalCharges) || 0,
                rentalCharges: parseFloat(formData.rentalCharges) || 0,
                paymentMethod: formData.paymentMethod,
                paymentDate: formData.paymentDate,
            };

            await createTransaction(transactionData).unwrap();
            toast.success("Transaction created successfully!");

            setFormData({
                customerId: "",
                ownerId: "", 
                bookingId: "",
                additionalCharges: "",
                rentalCharges: "",
                paymentMethod: "",
                paymentDate: "",
            });

            navigate('/transcations'); 

        } catch (error) {
            console.error("Error creating transaction", error);
            toast.error(error.data?.message || "An error occurred while creating the transaction.");
        }
    };

    if (bookingsLoading) {
        return <div>Loading...</div>; 
    }

    if (bookingsError) {
        return <div>Error loading data. Please try again later.</div>;
    }

    return (
        <div className="bg-ground rounded-[10px] text-primary-100">
            <div>
                <div className="p-4">
                    <div className="flex items-center h1 mb-0 text-capitalize d-flex align-items-center gap-2">
                        <IoPersonAddSharp className="text-2xl text-black" />
                        <h1 className="text-[1rem] font-semibold text-black">
                            Add New Transaction
                        </h1>
                    </div>
                </div>
                <div>
                    <form
                        className="bg-ground py-2 rounded-b-[10px]"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        id="add-user-form"
                    >
                        <FormSection
                            icon={<FiInfo className="mb-1" />}
                            title="Transaction Information"
                        >
                            <div className="row align-items-center p-4">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <FormSelect
                                        label="Customer ID"
                                        name="customerId"
                                        value={formData.customerId}
                                        onChange={handleInputChange}
                                        options={customerIds.map(id => ({
                                            value: id,
                                            label: `Customer ${id}`, // Adjust this label as needed
                                        })) || []}
                                        required
                                    />
                                </div>

                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <FormSelect
                                        label="Owner ID"
                                        name="ownerId"
                                        value={formData.ownerId}
                                        onChange={handleInputChange}
                                        options={ownerIds.map(id => ({
                                            value: id,
                                            label: `Owner ${id}`, // Adjust this label as needed
                                        })) || []}
                                        required
                                    />
                                </div>

                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <FormSelect
                                        label="Booking ID"
                                        name="bookingId"
                                        value={formData.bookingId}
                                        onChange={handleInputChange}
                                        options={bookingIds.map(id => ({
                                            value: id,
                                            label: id, // Adjust this as needed
                                        })) || []}
                                        required
                                    />
                                </div>

                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <FormInput
                                        label="Additional Charges"
                                        name="additionalCharges"
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter additional charges"
                                        value={formData.additionalCharges}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <FormInput
                                        label="Rental Charges"
                                        name="rentalCharges"
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter rental charges"
                                        value={formData.rentalCharges}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <FormInput
                                        label="Payment Method"
                                        name="paymentMethod"
                                        type="text"
                                        placeholder="Enter payment method"
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <FormInput
                                        label="Payment Date"
                                        name="paymentDate"
                                        type="date"
                                        value={formData.paymentDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <div className="p-4 flex justify-end">
                            <button
                                type="submit"
                                className="bg-black text-white border border-black py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                Create Transaction
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateTransactionPage;
