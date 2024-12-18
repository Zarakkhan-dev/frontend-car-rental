import React from 'react';

const DriverDetails = ({ driverData, onChange }) => {
  if (!driverData || !driverData.data || !driverData.data.drivers) {
    return <p>Loading driver data...</p>;
  }

  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-lg font-medium text-gray-500">Driver Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-gray-500 font-medium">Driver Name</label>
          <select
            name="driver_name"
            onChange={onChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
            required
          >
            <option value="">Select Driver</option>
            {driverData?.data?.drivers?.length > 0 ? (
              driverData.data.drivers.map((driver) => (
                <option value={driver.id} key={driver.id}>
                  {driver.name}
                </option>
              ))
            ) : (
              <option value="null">No drivers found</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
