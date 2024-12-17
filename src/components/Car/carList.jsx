import {useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllCarsQuery, useDeleteCarMutation } from "../../store/slices/carsApiSlice";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

function CarDetailsTable() {
  const { data: carsData, error, isLoading,refetch } = useGetAllCarsQuery();
  const [deleteCar] = useDeleteCarMutation();

  useEffect(()=>{
    refetch()
  },[])
  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      refetch()
      alert("Car deleted successfully.")
    } catch (error) {
      alert("Failed to delete car.");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading car details</p>;

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
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carsData.data && carsData.data.length > 0 ? (
              carsData.data.map((detail, index) => {
              
                const documents = detail.documents && Array.isArray(detail.documents) ? detail.documents[0] : {};
                const { id_card, insurance } = documents;

                return (
                  <tr
                    key={detail.id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3 border-t border-gray-200">{detail.id}</td>
                    <td className="px-4 py-3 border-t border-gray-200">{detail.make}</td>
                    <td className="px-4 py-3 border-t border-gray-200">{detail.model}</td>
                    <td className="px-4 py-3 border-t border-gray-200">{detail.variant}</td>
                    <td className="px-4 py-3 border-t border-gray-200">{detail.registration_no}</td>
                    <td className="px-4 py-3 border-t border-gray-200">
                      {insurance ? (
                        <a
                          href={insurance}
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
                      {id_card ? (
                        <a
                          href={id_card}
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
                );
              })
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
