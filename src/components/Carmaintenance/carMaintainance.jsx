import React, { useEffect, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useCreateMaintenanceMutation } from "../../store/slices/maintenancesApiSlice";
import { useGetAllCarsQuery } from "../../store/slices/carsApiSlice";

function FormField({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-gray-500 font-medium capitalize">
        {label.replace(/_/g, " ")}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
        required
      />
    </div>
  );
}

function CarMaintenanceForm() {
  const [createMaintenance, { isLoading, isError, isSuccess, error }] =
    useCreateMaintenanceMutation();
  const { data: carsData, refetch } = useGetAllCarsQuery();

  const [formData, setFormData] = useState({
    car_id: "",
    date: "",
    chassis_no: "",
    engine: "",
    cell: "",
    type: "",
    labour: "",
    total_labour_cost: 0,
    total_parts_cost: 0,
    grand_total: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createMaintenance({
        car_id: formData.car_id,
        date: formData.date,
        chassis_no: formData.chassis_no,
        engine: formData.engine,
        reg_no: formData.reg_no,
        cell: formData.cell,
        type: formData.type,
        labour: formData.labour,
        total_labour_cost: formData.total_labour_cost,
        total_parts_cost: formData.total_parts_cost,
        grand_total: formData.grand_total,
      }).unwrap();
      console.log()
      if (response?.status === "success") {
        setFormData({
          car_id: "",
          date: "",
          chassis_no: "",
          engine: "",
          reg_no: "",
          cell: "",
          type: "",
          labour: "",
          total_labour_cost: 0,
          total_parts_cost: 0,
          grand_total: 0,
        });
        alert("Maintenance data submitted successfully!");
      } else {
        alert("Maintenance data submission failed.");
      }
    } catch (err) {
      console.error("Error creating maintenance record:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-200 rounded-md shadow-lg w-full"
      >
        <div className="w-full h-56 overflow-hidden rounded-md relative mb-6">
          <img
            src="https://cdn.prod.website-files.com/658dff2844471300d9cc7681/65af18610ddc7efd1573a097_general-maintenance-featured-image.jpg"
            alt="Car"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
            Car Maintenance!
          </div>
        </div>

        <h1 className="text-base text-gray-600 font-bold flex items-center gap-1">
          <AiOutlineExclamationCircle /> Car Maintenance
        </h1>
        <div className="border-b border-gray-500 mt-1"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-500 font-medium">Car</label>
            <select
              name="car_id"
              value={formData.car_id}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
              required
            >
              <option value="">Select Car</option>
              {carsData?.data?.length > 0 ? (
                carsData.data.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.registration_no}
                  </option>
                ))
              ) : (
                <option value="null">No cars found</option>
              )}
            </select>
          </div>

          <FormField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
          <FormField
            label="Chassis No"
            name="chassis_no"
            value={formData.chassis_no}
            onChange={handleChange}
          />
          <FormField
            label="Engine"
            name="engine"
            value={formData.engine}
            onChange={handleChange}
          />
          <FormField
            label="Cell"
            name="cell"
            value={formData.cell}
            onChange={handleChange}
          />
          <FormField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
          <FormField
            label="Labour"
            name="labour"
            value={formData.labour}
            onChange={handleChange}
          />
          <FormField
            label="Total Labour Cost"
            name="total_labour_cost"
            type="number"
            value={formData.total_labour_cost}
            onChange={handleChange}
          />
          <FormField
            label="Total Parts Cost"
            name="total_parts_cost"
            type="number"
            value={formData.total_parts_cost}
            onChange={handleChange}
          />
          <FormField
            label="Grand Total"
            name="grand_total"
            type="number"
            value={formData.grand_total}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#192236] text-white py-2 rounded-md mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {isLoading && <p className="text-blue-500 mt-2">Submitting...</p>}
        {isError && (
          <p className="text-red-500 mt-2">
            Error: {error?.data?.message || "Submission failed"}
          </p>
        )}
        {isSuccess && (
          <p className="text-green-500 mt-2">Data submitted successfully!</p>
        )}
      </form>
    </div>
  );
}

export default CarMaintenanceForm;
