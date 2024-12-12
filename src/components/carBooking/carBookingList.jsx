// import React from "react";
// import { useGetAllBookingsQuery } from "../../store/slices/bookingsApi";
// import LoadingSpinner from "../loadingSpinner/loadingSpinner";



// function CarBookingList() {
//   const { data: bookingData, error, isLoading } = useGetAllBookingsQuery();

//   if (isLoading) return <p><LoadingSpinner/></p>;
//   if (error) return <p>Error loading bookings</p>;

//   return (
//     <div className="p-6 bg-gray-100  w-96 overflow-x-scroll  md:w-full scroll-smooth">
//       <h1 className="text-2xl font-bold text-gray-700 mb-6">Booking Data</h1>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="border border-gray-300 px-4 py-2">Car ID</th>
//             <th className="border border-gray-300 px-4 py-2">Username</th>
//             <th className="border border-gray-300 px-4 py-2">Company Name</th>
//             <th className="border border-gray-300 px-4 py-2">Start Date</th>
//             <th className="border border-gray-300 px-4 py-2">End Date</th>
//             <th className="border border-gray-300 px-4 py-2">Price Per Day</th>
//             <th className="border border-gray-300 px-4 py-2">With Driver</th>
//             <th className="border border-gray-300 px-4 py-2">Driver Details</th>
//             <th className="border border-gray-300 px-4 py-2">Agreement Document</th>
//             <th className="border border-gray-300 px-4 py-2">Car Picture</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookingData.map((booking, index) => (
//             <tr
//               key={index}
//               className={`${
//                 index % 2 === 0 ? "bg-white" : "bg-gray-50"
//               } hover:bg-gray-100`}
//             >
//               <td className="border border-gray-300 px-4 py-2">{booking.car_id}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.username}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.company_name}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.start_date}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.end_date}</td>
//               <td className="border border-gray-300 px-4 py-2">${booking.price_per_day}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.with_driver ? "Yes" : "No"}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {booking.with_driver && booking.driver_details ? (
//                   <div>
//                     <p>
//                       <strong>Name:</strong> {booking.driver_details.name}
//                     </p>
//                     <p>
//                       <strong>License:</strong> {booking.driver_details.license_number}
//                     </p>
//                     <p>
//                       <strong>Contact:</strong> {booking.driver_details.contact}
//                     </p>
//                   </div>
//                 ) : (
//                   "N/A"
//                 )}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <a
//                   href={booking.agreement_document}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                 >
//                   View Agreement
//                 </a>
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <a
//                   href={booking.car_picture}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                 >
//                   View Car Picture
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CarBookingList;


import { useEffect, useState } from "react";
import React  from "react";
import { useGetAllBookingsQuery } from "../../store/slices/bookingsApi";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function CarBookingList() {
  const [carBookingDetails, setCarBookingDetails] = useState([]);
  // const { data: bookingData, error, isLoading } = useGetAllBookingsQuery();

useEffect(()=>{


    const bookingData = [
    {
      car_id: 1,
      username: "JohnDoe",
      company_name: "ABC Rentals",
      start_date: "2024-01-10",
      end_date: "2024-01-15",
      price_per_day: 45,
      with_driver: true,
      driver_details: {
        name: "Jane Smith",
        license_number: "D123456789",
        contact: "555-1234",
      },
      agreement_document: "https://example.com/agreement1.pdf",
      car_picture: "https://example.com/car1.jpg",
    },
    {
      car_id: 2,
      username: "Alice123",
      company_name: "XYZ Rentals",
      start_date: "2024-02-01",
      end_date: "2024-02-10",
      price_per_day: 60,
      with_driver: false,
      driver_details: null,
      agreement_document: "https://example.com/agreement2.pdf",
      car_picture: "https://example.com/car2.jpg",
    },
    {
      car_id: 3,
      username: "BobB",
      company_name: "CarGo Rent",
      start_date: "2024-03-05",
      end_date: "2024-03-12",
      price_per_day: 55,
      with_driver: true,
      driver_details: {
        name: "Mark Johnson",
        license_number: "B987654321",
        contact: "555-5678",
      },
      agreement_document: "https://example.com/agreement3.pdf",
      car_picture: "https://example.com/car3.jpg",
    },
  ];
  setCarBookingDetails(bookingData)
},[])
  // if (isLoading) return <p><LoadingSpinner/></p>;
  // if (error) return <p>Error loading bookings</p>;

  const handleDelete = (car_id) => {
    console.log(`Deleting car booking detail with ID: ${car_id}`);
    setCarBookingDetails((prev) => prev.filter((detail) => detail.car_id !== car_id));
  };

  return (
    <div className="p-6 bg-gray-100 overflow-hidden">
    <h1 className="text-2xl font-bold text-gray-700 mb-6">Booking Data</h1>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border border-gray-200 shadow-md text-nowrap">
        <thead className="bg-gray-50 text-gray-700 text-base font-semibold shadow">
          <tr>
            <th className="px-4 py-3">Car ID</th>
            <th className="px-4 py-3">Username</th>
            <th className="px-4 py-3">Company Name</th>
            <th className="px-4 py-3">Start Date</th>
            <th className="px-4 py-3">End Date</th>
            <th className="px-4 py-3">Price Per Day</th>
            <th className="px-4 py-3">With Driver</th>
            <th className="px-4 py-3">Driver Details</th>
            <th className="px-4 py-3">Agreement Document</th>
            <th className="px-4 py-3">Car Picture</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {carBookingDetails.length > 0 ? (
            carBookingDetails.map((booking, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-3 border-t border-gray-200">{booking.car_id}</td>
                <td className="px-4 py-3 border-t border-gray-200">{booking.username}</td>
                <td className="px-4 py-3 border-t border-gray-200">{booking.company_name}</td>
                <td className="px-4 py-3 border-t border-gray-200">{booking.start_date}</td>
                <td className="px-4 py-3 border-t border-gray-200">{booking.end_date}</td>
                <td className="px-4 py-3 border-t border-gray-200">${booking.price_per_day}</td>
                <td className="px-4 py-3 border-t border-gray-200">{booking.with_driver ? "Yes" : "No"}</td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {booking.with_driver && booking.driver_details ? (
                    <div>
                      <p>
                        <strong>Name:</strong> {booking.driver_details.name}
                      </p>
                      <p>
                        <strong>License:</strong> {booking.driver_details.license_number}
                      </p>
                      <p>
                        <strong>Contact:</strong> {booking.driver_details.contact}
                      </p>
                    </div>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  <a
                    href={booking.agreement_document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    View Agreement
                  </a>
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  <a
                    href={booking.car_picture}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    View Car Picture
                  </a>
                </td>
                <td className="px-4 py-3 mt-3  border-gray-200 flex gap-3 text-center items-center justify-center">
                  <Link
                    to={`/CarBookingUpdate/${booking.car_id}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaEdit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(booking.car_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="w-5 h-5 text-center" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="11"
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

export default CarBookingList;
