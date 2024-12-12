// import React from "react";
// import { useGetAllFuelingsQuery } from "../../store/slices/fuelingApiSlice";
// import LoadingSpinner from "../loadingSpinner/loadingSpinner";
// import { Link } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";

// function FuelingList() {
//   // Fetch fueling data (uncomment the lines below when API is active)
//   // const { data: fuelingData, error, isLoading } = useGetAllFuelingsQuery();

//   // Sample data for now, replace it with fetched data
//   const fuelingData = [
//     {
//       fueling_id: 1,
//       customer_paid_by: "JohnDoe",
//       verified: "ABC Rentals",
//       total_amount_paid: 150,
//       remaining_amount_left: 50,
//       bill_paid: "Yes",
//       created_at: "2024-01-10",
//     },
//     {
//       fueling_id: 2,
//       customer_paid_by: "Alice123",
//       verified: "XYZ Rentals",
//       total_amount_paid: 200,
//       remaining_amount_left: 30,
//       bill_paid: "No",
//       created_at: "2024-02-01",
//     },
//     // Add more mock entries if needed
//   ];

//   // Handle delete logic (this can be replaced with an actual API call or Redux action)
//   const handleDelete = (fueling_id) => {
//     console.log(`Deleting card with ID: ${fueling_id}`);
//     setpaymentData((prev) => prev.filter((detail) => detail.fueling_id !== fueling_id));
//   };

//   // Handle loading and error states (uncomment when API is in use)
//   // if (isLoading) {
//   //   return <div><LoadingSpinner /></div>;
//   // }
//   // if (error) {
//   //   return <div>Error loading fueling data!</div>;
//   // }

//   return (
//     <div className="p-6 bg-gray-100 w-96 overflow-x-scroll md:w-full scroll-smooth">
//       <h1 className="text-2xl font-bold text-gray-700 mb-6">Fueling Maintenance Data</h1>
//       <table className="md:w-full border-collapse border border-gray-300 w-72 overflow-x-scroll md:overflow-hidden scroll-smooth">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="border border-gray-300 px-4 py-2">Booking ID</th>
//             <th className="border border-gray-300 px-4 py-2">Customer Paid By</th>
//             <th className="border border-gray-300 px-4 py-2">Verified</th>
//             <th className="border border-gray-300 px-4 py-2">Total Amount Paid</th>
//             <th className="border border-gray-300 px-4 py-2">Remaining Amount Left</th>
//             <th className="border border-gray-300 px-4 py-2">Bill Paid</th>
//             <th className="border border-gray-300 px-4 py-2">Created At</th>
//             <th className="border border-gray-300 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {fuelingData.map((data, index) => (
//             <tr
//               key={data.booking_id}
//               className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
//             >
//               <td className="border border-gray-300 px-4 py-2">{data.booking_id}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.customer_paid_by}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.verified}</td>
//               <td className="border border-gray-300 px-4 py-2">${data.total_amount_paid}</td>
//               <td className="border border-gray-300 px-4 py-2">${data.remaining_amount_left}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.bill_paid}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.created_at}</td>

//               <td className="border border-gray-300 px-4 py-2 flex gap-3 text-center">
//                 <Link
//                   to={`/FuelingUpdate/${data.booking_id}`}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <FaEdit className="w-6 h-6" />
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(data.booking_id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <FaTrash className="w-4 h-4" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default FuelingList;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

// import { useGetAllFuelingsQuery } from "../../store/slices/fuelingApiSlice";
// import LoadingSpinner from "../loadingSpinner/loadingSpinner";

function FuelingList() {
  // Sample data for now, replace it with fetched data
  const [fuelingData, setFuelingData] = useState([
    {
      fueling_id: 1,
      customer_paid_by: "JohnDoe",
      verified: "ABC Rentals",
      total_amount_paid: 150,
      remaining_amount_left: 50,
      bill_paid: "Yes",
      created_at: "2024-01-10",
    },
    {
      fueling_id: 2,
      customer_paid_by: "Alice123",
      verified: "XYZ Rentals",
      total_amount_paid: 200,
      remaining_amount_left: 30,
      bill_paid: "No",
      created_at: "2024-02-01",
    },
    // Add more mock entries if needed
  ]);

  // Handle delete logic (this can be replaced with an actual API call or Redux action)
  const handleDelete = (fueling_id) => {
    console.log(`Deleting fueling record with ID: ${fueling_id}`);
    setFuelingData((prev) => prev.filter((detail) => detail.fueling_id !== fueling_id));
  };

  // Handle loading and error states (uncomment when API is in use)
  // const { data: fuelingData, error, isLoading } = useGetAllFuelingsQuery();
  // if (isLoading) {
  //   return <div><LoadingSpinner /></div>;
  // }
  // if (error) {
  //   return <div>Error loading fueling data!</div>;
  // }

  return (
    <div className="p-6 bg-gray-100 overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Fueling Maintenance Data</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200 shadow-md">
          <thead className="bg-gray-50 text-gray-700 text-base font-semibold shadow">
            <tr>
              <th className="px-4 py-3">Fueling ID</th>
              <th className="px-4 py-3">Customer Paid By</th>
              <th className="px-4 py-3">Verified</th>
              <th className="px-4 py-3">Total Amount Paid</th>
              <th className="px-4 py-3">Remaining Amount Left</th>
              <th className="px-4 py-3">Bill Paid</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fuelingData.length > 0 ? (
              fuelingData.map((data, index) => (
                <tr
                  key={data.fueling_id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-3 border-t border-gray-200">{data.fueling_id}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{data.customer_paid_by}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{data.verified}</td>
                  <td className="px-4 py-3 border-t border-gray-200">${data.total_amount_paid}</td>
                  <td className="px-4 py-3 border-t border-gray-200">${data.remaining_amount_left}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{data.bill_paid}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{data.created_at}</td>
                  <td className="px-4 py-3 border-t border-gray-200 flex gap-3 text-center">
                    <Link
                      to={`/FuelingUpdate/${data.fueling_id}`}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaEdit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(data.fueling_id)}
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
                  colSpan="8"
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

export default FuelingList;
