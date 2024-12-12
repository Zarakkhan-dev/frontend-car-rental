import { useState } from "react";
import Tablefooter from "../List/Tablefooter";
import Tableheader from "../List/Tableheader";
import { FaEdit, FaEye } from "react-icons/fa";

const BookingListPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [carAllocationData, setCarAllocationData] = useState(
		initialCarAllocationData
	); // State for car allocation data
	const itemsPerPage = 12;

	// Handle page change
	const handleChange = (event, value) => {
		setCurrentPage(value);
	};

	// Filter data based on search query
	const filteredData = carAllocationData.filter(
		(car) => car.Customerid.toString().includes(searchQuery.toLowerCase()) // Adjust search logic as needed
	);

	const columnHeaders = [
		"Id",
		"Car ID",
		"Customer ID",
		"Rental Start Date",
		"Rental End Date",
		"Initial Condition ID",
		"Initial Mileage",
		"Total Price",
		"Action", // Action for Edit and View
	];

	return (
		<div className="w-full">
			{/* Table Header */}
			<Tableheader
				title={"Car Allocation"} // Update title to "Car Allocation"
				columnHeaders={columnHeaders}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			{/* Responsive Table Container */}
			<div className="overflow-x-auto">
				{filteredData.length === 0 ? (
					<div className="text-center text-primary-900 py-4">
						Data not found
					</div>
				) : (
					<>
						<table className="min-w-full table-auto rounded-lg">
							<thead className="bg-ground text-primary-900 rounded-t-lg">
								<tr>
									{columnHeaders.map((header, index) => (
										<th
											key={index}
											className="px-2 py-2 text-left text-xs sm:px-4 sm:text-sm md:text-base"
										>
											{header}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{filteredData
									.slice(
										(currentPage - 1) * itemsPerPage,
										currentPage * itemsPerPage
									)
									.map((car, index) => (
										<tr
											key={index}
											className="bg-white text-primary-900 hover:bg-hover-100"
										>
											{/* Add nowrap to avoid text breaking */}
											<td className="px-2 py-2 text-left whitespace-nowrap text-xs sm:px-1 sm:text-sm md:text-base">
												{car.Id}
											</td>
											<td className="px-2 py-2 text-left whitespace-nowrap text-xs sm:px-1 sm:text-sm md:text-base">
												{car.carid}
											</td>
											<td className="px-2 py-2 text-left whitespace-nowrap text-xs sm:px-1 sm:text-sm md:text-base">
												{car.Customerid}
											</td>
											<td className="px-2 py-2 text-left whitespace-nowrap text-green-500 text-xs sm:px-1 sm:text-sm md:text-base">
												{car.rentalStartDate}
											</td>
											<td className="px-2 py-2 text-left whitespace-nowrap text-xs sm:px-1 sm:text-sm md:text-base">
												{car.rentalEndDatedate}
											</td>
											<td className="px-2 py-2 text-left whitespace-nowrap text-xs sm:px-1 sm:text-sm md:text-base">
												{car.initialConditionId}
											</td>
											<td className="px-2 py-2 text-left whitespace-nowrap text-xs sm:px-1 sm:text-sm md:text-base">
												{car.initialMilage}
											</td>
											<td className="px-2 py-2 text-left whitespace-nowrap text-xs sm:px-1 sm:text-sm md:text-base">
												${car.totalPrice}
											</td>
											<td className="px-2 py-2 text-left">
												<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
													<button
														className="text-blue-500 border border-blue-500 p-1 sm:p-2 hover:text-blue-700 text-xs sm:text-sm md:text-base"
														onClick={() => console.log("Edit", car.Id)}
													>
														<FaEdit />
													</button>
													<button
														className="text-green-500 border border-green-500 p-1 sm:p-2 hover:text-green-700 text-xs sm:text-sm md:text-base"
														onClick={() => console.log("View", car.Id)}
													>
														<FaEye />
													</button>
												</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>

						{/* Footer with Showing text and Pagination */}
					</>
				)}
			</div>
			<Tablefooter
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				filteredData={filteredData}
				handleChange={handleChange}
			/>
		</div>
	);
};

export default BookingListPage;
