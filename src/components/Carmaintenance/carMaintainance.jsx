import React, { useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useCreateMaintenanceMutation } from '../../store/slices/maintenancesApiSlice';

function CarMaintenanceForm() {

  const [createMaintenance] = useCreateMaintenanceMutation();
  const [formData, setFormData] = useState({
    car_id: '',
    date: '',
    chassis_no: '',
    engine: '',
    reg_no: '',
    cell: '',
    type: '',
    labour: '',
    total_labour_cost: 0,
    total_parts_cost: 0,
    grand_total: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await createMaintenance(formData).unwrap(); 
      console.log('Maintenance record created successfully');
    } catch (err) {
      console.error('Error creating maintenance record', err);
    }
  };

  return (
    <>
    <div className='flex justify-center'>
    <form onSubmit={handleSubmit} className="p-6 bg-gray-200 rounded-md shadow-lg w-full">
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
      <h1 className='text-base text-gray-600 font-bold flex items-center gap-1'><span><AiOutlineExclamationCircle /></span>Car Mainteinance</h1>
      <div className='border-b border-gray-500 mt-1'></div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
      <div>
        <label className="block text-gray-500 font-medium">Car ID</label>
        <input
          type="text"
          name="car_id"
          value={formData.car_id}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-500 font-medium">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-500 font-medium">Chassis Number</label>
        <input
          type="text"
          name="chassis_no"
          value={formData.chassis_no}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-500 font-medium">Engine</label>
        <input
          type="text"
          name="engine"
          value={formData.engine}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-500 font-medium">Registration Number</label>
        <input
          type="text"
          name="reg_no"
          value={formData.reg_no}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-500 font-medium">Contact Number</label>
        <input
          type="tel"
          name="cell"
          value={formData.cell}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-500 font-medium">Type</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-500 font-medium">Labour</label>
        <input
          type="text"
          name="labour"
          value={formData.labour}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-500 font-medium">Total Labour Cost</label>
        <input
          type="number"
          name="total_labour_cost"
          value={formData.total_labour_cost}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-500 font-medium">Total Parts Cost</label>
        <input
          type="number"
          name="total_parts_cost"
          value={formData.total_parts_cost}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-500 font-medium">Grand Total</label>
        <input
          type="number"
          name="grand_total"
          value={formData.grand_total}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>
      </div>
      <button type="submit" className="w-full bg-[#192236] text-white py-2 rounded-md mt-4">Submit</button>
    </form>
    </div>
    </>
  );
}

export default CarMaintenanceForm;
