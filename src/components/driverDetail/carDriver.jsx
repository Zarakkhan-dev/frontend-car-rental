
import React from 'react';

const DriverDetails = ({ driverDetails, onChange }) => {
  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-lg font-medium text-gray-500">Driver Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-500 font-medium">Driver ID</label>
          <input
            type="text"
            name="id"
            value={driverDetails.id}
            onChange={onChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-500 font-medium">Driver Name</label>
          <input
            type="text"
            name="name"
            value={driverDetails.name}
            onChange={onChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;