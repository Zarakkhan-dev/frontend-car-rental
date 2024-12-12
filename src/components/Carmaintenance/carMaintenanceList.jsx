// import React from "react";
// import { useGetAllMaintenanceRecordsQuery } from "../../store/slices/maintenancesApiSlice";
// import LoadingSpinner from "../loadingSpinner/loadingSpinner";

// function CarMaintenenceList() {
//     // Fetching data using the API query hook
//     const { data: serviceData, isLoading, isError, error } = useGetAllMaintenanceRecordsQuery();

//     if (isLoading) {
//       return <div><LoadingSpinner/></div>;
//     }
  
//     if (isError) {
//       return <div>Error: {error.message}</div>;
//     }
  
//   return (
//     <div className="p-6 bg-gray-100 w-96 overflow-x-scroll md:w-full scroll-smooth">
//       <h1 className="text-2xl font-bold text-gray-700 mb-6">Car Service Data</h1>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="border border-gray-300 px-4 py-2">Car ID</th>
//             <th className="border border-gray-300 px-4 py-2">Date</th>
//             <th className="border border-gray-300 px-4 py-2">Chassis No</th>
//             <th className="border border-gray-300 px-4 py-2">Engine</th>
//             <th className="border border-gray-300 px-4 py-2">Reg No</th>
//             <th className="border border-gray-300 px-4 py-2">Cell</th>
//             <th className="border border-gray-300 px-4 py-2">Type</th>
//             <th className="border border-gray-300 px-4 py-2">Labour</th>
//             <th className="border border-gray-300 px-4 py-2">Total Labour Cost</th>
//             <th className="border border-gray-300 px-4 py-2">Total Parts Cost</th>
//             <th className="border border-gray-300 px-4 py-2">Grand Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {serviceData.map((data, index) => (
//             <tr
//               key={index}
//               className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
//             >
//               <td className="border border-gray-300 px-4 py-2">{data.car_id}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.date}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.chassis_no}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.engine}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.reg_no}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.cell}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.type}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.labour}</td>
//               <td className="border border-gray-300 px-4 py-2">${data.total_labour_cost}</td>
//               <td className="border border-gray-300 px-4 py-2">${data.total_parts_cost}</td>
//               <td className="border border-gray-300 px-4 py-2">${data.grand_total}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CarMaintenenceList;

import React, { useState } from "react";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function CarMaintenenceList() {
  // Fetching data using the API query hook
  // const { data: serviceData, isLoading, isError, error } = useGetAllMaintenanceRecordsQuery();

  // if (isLoading) {
  //   return <div><LoadingSpinner/></div>;
  // }

  // if (isError) {
  //   return <div>Error: {error.message}</div>;
  // }

  // Dummy data for display
  const [serviceData, setServiceData] = useState([
    {
      car_id: "CAR123",
      date: "2024-01-10",
      chassis_no: "CH12345",
      engine: "V6",
      reg_no: "REG456",
      cell: "123-456-7890",
      type: "Routine Maintenance",
      labour: "John Doe",
      total_labour_cost: 200,
      total_parts_cost: 150,
      grand_total: 350,
    },
    {
      car_id: "CAR456",
      date: "2024-01-12",
      chassis_no: "CH67890",
      engine: "V8",
      reg_no: "REG789",
      cell: "987-654-3210",
      type: "Repair",
      labour: "Jane Smith",
      total_labour_cost: 300,
      total_parts_cost: 250,
      grand_total: 550,
    },
    {
      car_id: "CAR789",
      date: "2024-01-15",
      chassis_no: "CH11223",
      engine: "Electric",
      reg_no: "REG123",
      cell: "456-789-0123",
      type: "Battery Replacement",
      labour: "Alice Johnson",
      total_labour_cost: 100,
      total_parts_cost: 400,
      grand_total: 500,
    },
  ]);

  // Handle delete logic (this can be replaced with an actual API call or Redux action)
  const handleDelete = (car_id) => {
    console.log(`Deleting car maintenance record with ID: ${car_id}`);
    setServiceData((prev) => prev.filter((data) => data.car_id !== car_id));
  };

  return (
    <div className="p-6 bg-gray-100 overflow-hidden">
    <h1 className="text-2xl font-bold text-gray-700 mb-6">Car Service Data</h1>
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
          {serviceData.length > 0 ? (
            serviceData.map((data, index) => (
              <tr
                key={data.car_id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-3 border-t border-gray-200">{data.car_id}</td>
                <td className="px-4 py-3 border-t border-gray-200">{data.date}</td>
                <td className="px-4 py-3 border-t border-gray-200">{data.chassis_no}</td>
                <td className="px-4 py-3 border-t border-gray-200">{data.engine}</td>
                <td className="px-4 py-3 border-t border-gray-200">{data.reg_no}</td>
                <td className="px-4 py-3 border-t border-gray-200">{data.cell}</td>
                <td className="px-4 py-3 border-t border-gray-200">{data.type}</td>
                <td className="px-4 py-3 border-t border-gray-200">{data.labour}</td>
                <td className="px-4 py-3 border-t border-gray-200">${data.total_labour_cost}</td>
                <td className="px-4 py-3 border-t border-gray-200">${data.total_parts_cost}</td>
                <td className="px-4 py-3 border-t border-gray-200">${data.grand_total}</td>
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

