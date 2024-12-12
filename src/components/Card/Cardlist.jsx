// import React from "react";
// import { useGetAllCardsQuery } from "../../store/slices/cardsApiSlice";
// import LoadingSpinner from "../loadingSpinner/loadingSpinner";
// import { FaEdit, FaTrash } from "react-icons/fa";

// function CardPaymentList() {
//   const { data: paymentData, error, isLoading } = useGetAllCardsQuery();

//   if (isLoading) return <p><LoadingSpinner/></p>;
//   if (error) return <p>Error fetching card data.</p>;

//   return (
//     <div className="p-6 bg-gray-100 w-96 overflow-x-scroll md:w-full scroll-smooth">
//       <h1 className="text-2xl font-bold text-gray-700 mb-6">Card Payment Data</h1>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="border border-gray-300 px-4 py-2">Bank Name</th>
//             <th className="border border-gray-300 px-4 py-2">Holder Name</th>
//             <th className="border border-gray-300 px-4 py-2">Card Number</th>
//             <th className="border border-gray-300 px-4 py-2">Card Charge</th>
//             <th className="border border-gray-300 px-4 py-2">Due Date</th>
//             <th className="border border-gray-300 px-4 py-2">Year Fee</th>
//             <th className="border border-gray-300 px-4 py-2">Status</th>
//             <th className="border border-gray-300 px-4 py-2">Paid Amount</th>
//             <th className="border border-gray-300 px-4 py-2">Extra Pay</th>
//             <th className="border border-gray-300 px-4 py-2">Less Pay</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paymentData.map((data, index) => (
//             <tr
//               key={index}
//               className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
//             >
//               <td className="border border-gray-300 px-4 py-2">{data.bank_name}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.holder_name}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.card_number}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.card_charge}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.due_date}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.year_fee}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.status}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.paid_amount}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.extra_pay}</td>
//               <td className="border border-gray-300 px-4 py-2">{data.less_pay}</td>
//               <td className="border border-gray-300 px-4 py-2 flex space-x-2">
//                 <Link
//                   to={`/edit-booking/${booking.id}`}
//                   className="text-blue-500 hover:text-blue-700"
//                 >
//                   <FaEdit />
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(booking.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CardPaymentList;


import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

// import { useGetAllCardsQuery } from "../../store/slices/cardsApiSlice";
// import LoadingSpinner from "../loadingSpinner/loadingSpinner";

function CardPaymentList() {
  const [paymentData, setpaymentData] = useState([]);

  //   const { data: paymentData, error, isLoading } = useGetAllCardsQuery();

  // if (isLoading) return <p><LoadingSpinner /></p>;
  // if (error) return <p>Error fetching card data.</p>;

  // Dummy data for now, replace it with fetched data
  useEffect(() => {
    const dummyData = [
      {
        card_id: "1",
        bank_name: "Bank of America",
        holder_name: "John Doe",
        card_number: "**** **** **** 1234",
        card_charge: "$500",
        due_date: "2024-01-15",
        year_fee: "$100",
        status: "Active",
        paid_amount: "$300",
        extra_pay: "$50",
        less_pay: "$0",
      },
      {
        card_id: "2",
        bank_name: "Chase",
        holder_name: "Jane Smith",
        card_number: "**** **** **** 5678",
        card_charge: "$800",
        due_date: "2024-02-10",
        year_fee: "$120",
        status: "Inactive",
        paid_amount: "$400",
        extra_pay: "$30",
        less_pay: "$10",
      },
      {
        card_id: "3",
        bank_name: "Citibank",
        holder_name: "Alice Johnson",
        card_number: "**** **** **** 4321",
        card_charge: "$700",
        due_date: "2024-03-05",
        year_fee: "$150",
        status: "Active",
        paid_amount: "$500",
        extra_pay: "$60",
        less_pay: "$0",
      },
    ];
    setpaymentData(dummyData);
  }, []); // Empty dependency array ensures this runs only once.

  // Handle delete functionality
  const handleDelete = (card_id) => {
    console.log(`Deleting card with ID: ${card_id}`);
    setpaymentData((prev) => prev.filter((detail) => detail.card_id !== card_id));
  };

  return (
    <div className="p-6 bg-gray-100 overflow-scroll scroll-smooth">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Card Payment Data</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200 shadow-md text-nowrap">
          <thead className="bg-gray-50 text-gray-700 text-base font-semibold shadow">
            <tr>
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">Bank Name</th>
              <th className="px-4 py-3">Holder Name</th>
              <th className="px-4 py-3">Card Number</th>
              <th className="px-4 py-3">Card Charge</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Year Fee</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Paid Amount</th>
              <th className="px-4 py-3">Extra Pay</th>
              <th className="px-4 py-3">Less Pay</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.length > 0 ? (
              paymentData.map((data, index) => (
                <tr
                  key={data.card_id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-3 border-t border-gray-200">{data.card_id}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{data.bank_name}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{data.holder_name}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{data.card_number}</td>
                  <td className="px-4 py-3 border-t border-gray-200">${data.card_charge}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{data.due_date}</td>
                  <td className="px-4 py-3 border-t border-gray-200">${data.year_fee}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{data.status}</td>
                  <td className="px-4 py-3 border-t border-gray-200">${data.paid_amount}</td>
                  <td className="px-4 py-3 border-t border-gray-200">${data.extra_pay}</td>
                  <td className="px-4 py-3 border-t border-gray-200">${data.less_pay}</td>
                  <td className="px-4 py-3 border-t border-gray-200 flex gap-3 text-center">
                    <Link
                      to={`/CardUpdate/${data.card_id}`}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaEdit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(data.card_id)}
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

export default CardPaymentList;


