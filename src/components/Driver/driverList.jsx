import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllDriversQuery, useDeleteDriverMutation } from "../../store/slices/driverApiSlice";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

function DriverDetailsTable() {
  const { data: driversData, error, isLoading, refetch } = useGetAllDriversQuery();
  const [deleteDriver] = useDeleteDriverMutation();

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDriver(id);
      refetch();
      alert("Driver deleted successfully.");
    } catch (error) {
      alert("Failed to delete driver.");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading driver details</p>;

  return (
    <div className="p-6 bg-gray-100 overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Driver Details</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200 shadow-md">
          <thead className="bg-gray-50 text-gray-700 text-base font-semibold shadow">
            <tr>
              <th className="px-4 py-3">Driver ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">License</th>
              <th className="px-4 py-3">Identity Card</th>
              <th className="px-4 py-3">Phone Number</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {driversData.data && driversData.data.length > 0 ? (
              driversData.data.map((detail, index) => {
                return (
                  <tr
                    key={detail.id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3 border-t border-gray-200">{detail.id}</td>
                    <td className="px-4 py-3 border-t border-gray-200">{detail.name}</td>
                    <td className="px-4 py-3 border-t border-gray-200">{detail.license}</td>
                    <td className="px-4 py-3 border-t border-gray-200">
                      {detail.identity_card ? (
                        <a
                          href={detail.identity_card}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline hover:text-blue-700"
                        >
                          View Identity Card
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-200">{detail.phone_number}</td>
                    <td className="px-4 py-3 border-t border-gray-200 flex gap-3 text-center">
                      <Link
                        to={`/UpdateDriverForm/${detail.id}`}
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
                  colSpan="6"
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

export default DriverDetailsTable;
