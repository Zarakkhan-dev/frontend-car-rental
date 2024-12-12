// import React, { useEffect, useState } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useGetAllCarsQuery } from "../../store/slices/carsApiSlice";
// import LoadingSpinner from "../loadingSpinner/loadingSpinner";

// function CarDetailsTable() {
// const { data: carsData, error, isLoading } = useGetAllCarsQuery();

//   const [carDetails, setCarDetails] = useState([]);

//   // Set dummy data
//   // useEffect(() => {
//   //   const dummyData = [
//   //     {
//   //       id: 1,
//   //       make: "Toyota",
//   //       model: "Corolla",
//   //       variant: "SE",
//   //       registration_no: "ABC123",
//   //       insurance_document: "https://example.com/insurance1.pdf",
//   //       id_card_document: "https://example.com/idcard1.pdf",
//   //       created_at: "2024-01-01T10:00:00Z",
//   //     },
//   //     {
//   //       id: 2,
//   //       make: "Honda",
//   //       model: "Civic",
//   //       variant: "LX",
//   //       registration_no: "DEF456",
//   //       insurance_document: null,
//   //       id_card_document: "https://example.com/idcard2.pdf",
//   //       created_at: "2024-02-01T15:30:00Z",
//   //     },
//   //     {
//   //       id: 3,
//   //       make: "Ford",
//   //       model: "Focus",
//   //       variant: "Titanium",
//   //       registration_no: "GHI789",
//   //       insurance_document: "https://example.com/insurance3.pdf",
//   //       id_card_document: null,
//   //       created_at: "2024-03-01T08:45:00Z",
//   //     },
//   //   ];
//   //   setCarDetails(dummyData);
//   // }, []);

//    if (isLoading) return <p><LoadingSpinner/></p>;
//   if (error) return <p>Error loading bookings</p>;

//   const handleDelete = (id) => {
//     console.log(`Deleting car detail with ID: ${id}`);
//     setCarDetails((prev) => prev.filter((detail) => detail.id !== id));
//   };

//   return (
//     <div className="p-6 bg-gray-100 overflow-hidden">
//       <h1 className="text-2xl font-bold text-gray-700 mb-6">Car Details</h1>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left border border-gray-200 shadow-md">
//           <thead className="bg-gray-50 text-gray-700 text-base font-semibold shadow">
//             <tr>
//               <th className="px-4 py-3">Car ID</th>
//               <th className="px-4 py-3">Make</th>
//               <th className="px-4 py-3">Model</th>
//               <th className="px-4 py-3">Variant</th>
//               <th className="px-4 py-3">Registration No</th>
//               <th className="px-4 py-3">Insurance Document</th>
//               <th className="px-4 py-3">ID Card</th>
//               <th className="px-4 py-3">Created At</th>
//               <th className="px-4 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {carDetails.length > 0 ? (
//               carDetails.map((detail, index) => (
//                 <tr
//                   key={index}
//                   className={`${
//                     index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   } hover:bg-gray-100`}
//                 >
//                   <td className="px-4 py-3 border-t border-gray-200">{detail.id}</td>
//                   <td className="px-4 py-3 border-t border-gray-200">{detail.make}</td>
//                   <td className="px-4 py-3 border-t border-gray-200">{detail.model}</td>
//                   <td className="px-4 py-3 border-t border-gray-200">{detail.variant}</td>
//                   <td className="px-4 py-3 border-t border-gray-200">{detail.registration_no}</td>
//                   <td className="px-4 py-3 border-t border-gray-200">
//                     {detail.insurance_document ? (
//                       <a
//                         href={detail.insurance_document}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 underline hover:text-blue-700"
//                       >
//                         View Insurance
//                       </a>
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                   <td className="px-4 py-3 border-t border-gray-200">
//                     {detail.id_card_document ? (
//                       <a
//                         href={detail.id_card_document}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 underline hover:text-blue-700"
//                       >
//                         View ID Card
//                       </a>
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                   <td className="px-4 py-3 border-t border-gray-200">
//                     {new Date(detail.created_at).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-3 border-t border-gray-200 flex gap-3 text-center">
//                     <Link
//                       to={`/UpdateCarForm/${detail.id}`}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       <FaEdit className="w-5 h-5" />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(detail.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <FaTrash className="w-5 h-5" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="9"
//                   className="px-4 py-3 text-center text-gray-500"
//                 >
//                   No records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default CarDetailsTable;



import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllCarsQuery } from "../../store/slices/carsApiSlice";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

function CarDetailsTable() {
// const { data: carsData, error, isLoading } = useGetAllCarsQuery();

  const [carDetails, setCarDetails] = useState([]);

  // Set dummy data
  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        make: "Toyota",
        model: "Corolla",
        variant: "SE",
        registration_no: "ABC123",
        insurance_document: "https://example.com/insurance1.pdf",
        id_card_document: "https://example.com/idcard1.pdf",
        created_at: "2024-01-01T10:00:00Z",
      },
      {
        id: 2,
        make: "Honda",
        model: "Civic",
        variant: "LX",
        registration_no: "DEF456",
        insurance_document: null,
        id_card_document: "https://example.com/idcard2.pdf",
        created_at: "2024-02-01T15:30:00Z",
      },
      {
        id: 3,
        make: "Ford",
        model: "Focus",
        variant: "Titanium",
        registration_no: "GHI789",
        insurance_document: "https://example.com/insurance3.pdf",
        id_card_document: null,
        created_at: "2024-03-01T08:45:00Z",
      },
    ];
    setCarDetails(dummyData);
  }, []);

  //  if (isLoading) return <p><LoadingSpinner/></p>;
  // if (error) return <p>Error loading car Details</p>;

  const handleDelete = (id) => {
    console.log(`Deleting car detail with ID: ${id}`);
    setCarDetails((prev) => prev.filter((detail) => detail.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Car Details</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200 shadow-md">
          <thead className="bg-gray-50 text-gray-700 text-base font-semibold shadow">
            <tr>
              <th className="px-4 py-3">Car ID</th>
              <th className="px-4 py-3">Make</th>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">Variant</th>
              <th className="px-4 py-3">Registration No</th>
              <th className="px-4 py-3">Insurance Document</th>
              <th className="px-4 py-3">ID Card</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carDetails.length > 0 ? (
              carDetails.map((detail, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-3 border-t border-gray-200">{detail.id}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{detail.make}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{detail.model}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{detail.variant}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{detail.registration_no}</td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {detail.insurance_document ? (
                      <a
                        href={detail.insurance_document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        View Insurance
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {detail.id_card_document ? (
                      <a
                        href={detail.id_card_document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        View ID Card
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {new Date(detail.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200 flex gap-3 text-center">
                    <Link
                      to={`/UpdateCarForm/${detail.id}`}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaEdit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(detail.id)}
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
                  colSpan="9"
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

export default CarDetailsTable;
