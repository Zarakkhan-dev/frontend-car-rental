import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { 
  useGetAllCardsQuery, 
  useDeleteCardMutation 
} from "../../store/slices/cardsApiSlice";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

function CardPaymentList() {
  const { data: paymentData, error, isLoading, refetch } = useGetAllCardsQuery();
  const [deleteCard] = useDeleteCardMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await deleteCard(id).unwrap(); 
        refetch();
        alert("Card detail deleted successfully.");
      } catch (error) {
        console.error("Error deleting card:", error);
        alert("Failed to delete card detail. Please try again.");
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error fetching card data.</p>;

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
            {paymentData?.data?.cards?.length > 0 ? (
              paymentData.data.cards.map((card, index) => (
                <tr
                  key={card.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-3 border-t border-gray-200">{card.id}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{card.bank_name}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{card.holder_name}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{card.card_number}</td>
                  <td className="px-4 py-3 border-t border-gray-200">${card.card_charge}</td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {new Date(card.due_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">${card.year_fee}</td>
                  <td className="px-4 py-3 border-t border-gray-200">{card.status}</td>
                  <td className="px-4 py-3 border-t border-gray-200">${card.paid_amount}</td>
                  <td className="px-4 py-3 border-t border-gray-200">${card.extra_pay}</td>
                  <td className="px-4 py-3 border-t border-gray-200">${card.less_pay}</td>
                  <td className="px-4 py-3 border-t border-gray-200 flex gap-3 text-center">
                    <Link
                      to={`/CardUpdate/${card.id}`}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaEdit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(card.id)}
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
