import React, { useEffect } from "react";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useDeleteMaintenanceMutation,
  useGetAllMaintenanceRecordsQuery,
} from "../../store/slices/maintenancesApiSlice";

function CarMaintenenceList() {
  const {
    data: serviceData,
    isLoading,
    isError,
    error,
    refetch
  } = useGetAllMaintenanceRecordsQuery();
  const [deleteMaintenance] = useDeleteMaintenanceMutation();


  useEffect(()=>{
refetch()
  },[])
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error?.message || "Failed to fetch data"}</div>;
  }

  const handleDelete = async (car_id) => {
    try {
      await deleteMaintenance(car_id).unwrap();
      refetch();
      console.log(`Deleted maintenance record with ID: ${car_id}`);
    } catch (error) {
      console.error("Failed to delete maintenance record:", error);
    }
  };


  return (
    <div className="p-6 bg-gray-100 overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        Car Service Data
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200 shadow-md text-nowrap">
          <thead className="bg-gray-50 text-gray-700 text-base font-semibold shadow">
            <tr>
              <th className="px-4 py-3">Car ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Chassis No</th>
              <th className="px-4 py-3">Engine</th>
              <th className="px-4 py-3">Reg No</th>
              <th className="px-4 py-3">Cell</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Labour</th>
              <th className="px-4 py-3">Total Labour Cost</th>
              <th className="px-4 py-3">Total Parts Cost</th>
              <th className="px-4 py-3">Grand Total</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceData?.data?.maintenanceRecords?.length > 0 ? (
              serviceData.data.maintenanceRecords.map((data, index) => (
                <tr
                  key={data.car_id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-3 border-t border-gray-200">
                    {data.car_id}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {data.date}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {data.chassis_no}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {data.engine}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {data.registration_no}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {data.cell}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {data.type}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {data.labour}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {data.total_labour_cost}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {data.total_parts_cost}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {data.grand_total}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200 flex gap-3 text-center">
                    <Link
                      to={`/CarMaintenanceUpdate/${data.car_id}`}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaEdit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(data.car_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CarMaintenenceList;
