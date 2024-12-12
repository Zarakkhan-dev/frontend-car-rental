// import { FiDollarSign, FiUsers, FiEye } from "react-icons/fi";

// import { useGetCustomersQuery } from "../../../redux/slices/customersApiSlice";
// import { useGetUsersQuery } from "../../../redux/slices/usersApiSlice";
// import { useEffect, useState } from "react";

// import { useGetAllRevenueQuery } from "../../../redux/slices/transactionsApiSlice";
// import StatusCard from "./statusCard";
// import Loader from "../loader";
// const Status = () => {
// 	const [totalUsers, setTotalUsers] = useState(0);
// 	const [totalCustomers, setTotalCustomers] = useState(0);
// 	const [totalRevenue, setTotalRevenue] = useState(0);

// 	const { data: customers, isLoading: customersLoadings } =
// 		useGetCustomersQuery({});

// 	const { data: users, isLoading: usersLoadings } = useGetUsersQuery({});

// 	const { data: transcations, isLoading: transcationsLoading } =
// 		useGetAllRevenueQuery({});

// 	useEffect(() => {
// 		if (users && customers && transcations) {
// 			const totalIncome = transcations?.doc?.reduce(
// 				(item) => item.rentalCharges,
// 				0
// 			);
// 			setTotalCustomers(users?.results);
// 			setTotalUsers(customers?.results);
// 		}
// 	}, [customers, users]);

// 	console.log(users, customers);

// 	return customersLoadings && usersLoadings ? (
// 		<Loader />
// 	) : customers && users ? (
// 		<div className="flex flex-col gap-4 w-full">
// 			<StatusCard
// 				title="Revenue"
// 				value="$75K"
// 				change="$34"
// 				changeType="increase"
// 				icon={<FiDollarSign size={28} />}
// 			/>
// 			<StatusCard
// 				title="Total Customers"
// 				value={totalCustomers.toString()}
// 				icon={<FiUsers size={28} />}
// 			/>
// 			<StatusCard
// 				title="Total Users"
// 				value={totalUsers.toString()}
// 				icon={<FiEye size={28} />}
// 			/>
// 		</div>
// 	) : null;
// };

// export default Status;



import React from "react";
import { FiDollarSign, FiUsers, FiEye } from "react-icons/fi";
import StatusCard from "./statusCard";

const Status = () => {
  // Dummy data for total users, total customers, and revenue
  const totalUsers = 120; // Replace with desired dummy value
  const totalCustomers = 80; // Replace with desired dummy value
  const revenue = "$75K"; // Replace with desired dummy value

  return (
    <div className="flex flex-col gap-4 w-full">
      <StatusCard
        title="Revenue"
        value={revenue}
        change="$34"
        changeType="increase"
        icon={<FiDollarSign size={28} />}
      />
      <StatusCard
        title="Total Customers"
        value={totalCustomers.toString()}
        icon={<FiUsers size={28} />}
      />
      <StatusCard
        title="Total Users"
        value={totalUsers.toString()}
        icon={<FiEye size={28} />}
      />
    </div>
  );
};

export default Status;
