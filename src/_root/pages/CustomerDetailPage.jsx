import { useParams } from "react-router-dom";
import { useGetAllCustomerDetailsQuery } from "../../redux/slices/customersApiSlice";
import Loader from "../../components/shared/Loader";
import NoDataFoundMessage from "../../components/shared/NoDataFoundMessage";
import CustomerDetails from "../../components/Customer/CustomerDetails";

const CustomerDetailPage = () => {
	const { id } = useParams();

	const { data: customer, isLoading } = useGetAllCustomerDetailsQuery(id);

	return isLoading ? (
		<Loader />
	) : customer && customer?.doc ? (
		<div>
			<CustomerDetails customer={customer?.doc[0]} />
		</div>
	) : (
		<NoDataFoundMessage message="customer data not found." />
	);
};

export default CustomerDetailPage;
