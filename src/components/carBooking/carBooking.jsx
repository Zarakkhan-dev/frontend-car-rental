import { useState, useEffect } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useCreateBookingMutation } from "../../store/slices/bookingsApi";
import DriverDetails from "../driverDetail/carDriver";
import { useGetAllCarsQuery } from "../../store/slices/carsApiSlice";
import { useGetAllDriversQuery } from "../../store/slices/driverApiSlice";

function CarBookingForm() {
  const [createBooking] = useCreateBookingMutation();
  const { data: carsData, error, isLoading, refetch } = useGetAllCarsQuery();
  const { data: driverData, isLoading: isDriversLoading, error: driverError } = useGetAllDriversQuery();

  const [formData, setFormData] = useState({
    car_id: "",
    username: "",
    company_name: "",
    start_date: "",
    end_date: "",
    price_per_day: 0,
    price_per_month: 0,
    agreement: null,
    car_pictures: null,
    with_driver: false, // Indicates whether a driver is selected
    driver_details: {
      id: "",
      name: "",
      license: "",
      identity_card_number: "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleDriverChange = (e) => {
    const selectedDriverId = e.target.value;
    const selectedDriver = driverData?.data?.find(driver => driver.id === selectedDriverId);

    if (selectedDriver) {
      setFormData((prevData) => ({
        ...prevData,
        driver_details: {
          id: selectedDriver.id,
          name: selectedDriver.name,
          license: selectedDriver.license,
          identity_card_number: selectedDriver.identity_card_number,
        },
      }));
    }
  };

  const handleDriverToggle = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      with_driver: checked,
      driver_details: checked ? prevData.driver_details : {} // Clear driver details if "With Driver" is unchecked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "driver_details" && !formData.with_driver) {
          // Don't send driver details if "With Driver" is not checked
          return;
        }
        if (key === "driver_details") {
          Object.keys(formData.driver_details).forEach((subKey) => {
            formDataToSend.append(`driver_details[${subKey}]`, formData.driver_details[subKey]);
          });
        } else if (key === "agreement" || key === "car_pictures") {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const result = await createBooking(formDataToSend).unwrap();
      console.log("Booking created successfully:", result);
      alert("Booking created successfully!");
    } catch (err) {
      console.error("Error creating booking:", err);
      alert("Error creating booking. Please try again.");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <p>Loading cars...</p>;
  }

  if (isDriversLoading) {
    return <p>Loading drivers...</p>;
  }

  if (error) {
    return <p>Error fetching cars: {error.message}</p>;
  }

  if (driverError) {
    return <p>Error fetching drivers: {driverError.message}</p>;
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-200 rounded-lg shadow-lg w-full"
      >
        {/* Car Image */}
        <div className="w-full h-56 overflow-hidden rounded-md relative mb-6">
          <img
            src="https://deinfa.com/wp-content/uploads/2024/06/A-Guide-to-Electric-Cars-in-Pakistan-Featured-Image.png"
            alt="Car"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
            Book Your Car Now!
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-600 flex items-center gap-2">
          <AiOutlineExclamationCircle />
          Car Booking
        </h1>
        <div className="border-b border-gray-300 mt-2"></div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="col-span-1">
            <label className="block text-gray-500 font-medium">
              Car Registration No
            </label>
            <select
              name="car_id"
              value={carsData.car_id}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            >
              <option value="">Select Registration No</option>
              {carsData?.data?.length > 0 ? (
                carsData.data.map((car) => (
                  <option value={car.car_id} key={car.id}>
                    {car.registration_no}
                  </option>
                ))
              ) : (
                <option value="null">No cars found</option>
              )}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-500 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-500 font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500 font-medium">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500 font-medium">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-500 font-medium">
              Price per Day
            </label>
            <input
              type="number"
              name="price_per_day"
              value={formData.price_per_day}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-500 font-medium">
              Price per Month
            </label>
            <input
              type="number"
              name="price_per_month"
              value={formData.price_per_month}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-500 font-medium">
            Agreement Document
          </label>
          <input
            type="file"
            name="agreement"
            onChange={handleChange}
            className="w-full mt-1 p-2"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-500 font-medium">Car Pictures</label>
          <input
            type="file"
            name="car_pictures"
            onChange={handleChange}
            className="w-full mt-1 p-2"
            multiple
            required
          />
        </div>

        {/* With Driver Checkbox */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="with_driver"
            checked={formData.with_driver}
            onChange={handleDriverToggle}
            className="rounded-md"
          />
          <label className="text-gray-500">With Driver</label>
        </div>

        {/* Driver Details (Conditionally rendered) */}
        {formData.with_driver && (
          <DriverDetails
            driverData={driverData}
            onChange={handleDriverChange}
          />
        )}

        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 bg-[#192236] text-white rounded-md"
          >
            Submit Booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default CarBookingForm;
