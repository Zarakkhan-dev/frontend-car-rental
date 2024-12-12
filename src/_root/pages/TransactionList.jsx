import { useState } from "react";
import Tableheader from "../../components/List/Tableheader";
import Tablefooter from "../../components/List/Tablefooter";
import { FaEdit, FaEye } from "react-icons/fa";
import { useGetTransactionsQuery } from "../../redux/slices/transactionsApiSlice";
import Loader from "../../components/shared/Loader";
import NoDataFoundMessage from "../../components/shared/NoDataFoundMessage";
import { formatDate } from "../../helpers/helper";
import { useNavigate } from "react-router-dom";

const TransactionList = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const itemsPerPage = 12;

	const { data: transactions, isLoading, error } = useGetTransactionsQuery({});

	const navigate = useNavigate();

	// Handle page change
	const handleChange = (event, value) => {
		setCurrentPage(value);
	};

	const columnHeaders = [
		"S. No",
		"Customer ID",
		"Booking ID",
		"Owner ID",
		"Additional Charges",
		"Rental Charges",
		"Total Amount",
		"Status",
		"Payment Method",
		"Payment Date",
		"Created At",
		"Updated At",
		"Actions",
	];

	if (isLoading) return <Loader />;
	if (error)
		return <NoDataFoundMessage message="Failed to load transactions!" />;
	if (!transactions || !transactions.doc.length)
		return <NoDataFoundMessage message="No transactions found!" />;

	return (
		<div className="w-full">
			{/* Table Header */}
			<Tableheader
				title="Transactions"
				columnHeaders={columnHeaders}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			<div className="overflow-x-auto">
				<table className="min-w-full table-auto rounded-lg border border-gray-200">
					<thead className="bg-gray-100 text-gray-700 border-b border-gray-200">
						<tr>
							{columnHeaders.map((header, index) => (
								<th
									key={index}
									className="px-4 py-2 text-left text-xs sm:text-sm md:text-base font-semibold"
								>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{transactions.doc
							.slice(
								(currentPage - 1) * itemsPerPage,
								currentPage * itemsPerPage
							)
							.map((transaction, index) => (
								<tr
									key={transaction.id} // Ensure this is unique
									className="bg-white border-b border-gray-200 text-gray-800 hover:bg-gray-50"
								>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										{++index}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										{transaction.customerId}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										{transaction.bookingId}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										{transaction.ownerId}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										${transaction.additionalCharges}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										${transaction.rentalCharges}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										${transaction.totalAmount}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										{transaction.status}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										{transaction.paymentMethod}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										{formatDate(transaction.paymentDate)}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										{formatDate(transaction.created_at)}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										{formatDate(transaction.updated_at)}
									</td>
									<td className="px-4 py-2 text-sm sm:text-base whitespace-nowrap">
										<div className="flex space-x-2">
											<button
												className="text-blue-500 border border-blue-500 p-1 rounded hover:text-blue-700 hover:border-blue-700"
												onClick={() => console.log("Edit", transaction.id)}
											>
												<FaEdit />
											</button>
											<button
												className="text-green-500 border border-green-500 p-1 rounded hover:text-green-700 hover:border-green-700"
												onClick={() =>
													navigate(
														`/billing-payments/add-card/transaction-list/${transaction.id}`
													)
												}
											>
												<FaEye />
											</button>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>

				<Tablefooter
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					filteredData={transactions.doc}
					handleChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default TransactionList;
