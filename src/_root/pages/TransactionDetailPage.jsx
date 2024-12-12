import { useParams } from "react-router-dom";
import { useGetTransactionDetailsQuery } from "../../redux/slices/transactionsApiSlice";
import Loader from "../../components/shared/Loader";
import NoDataFoundMessage from "../../components/shared/NoDataFoundMessage";
import TransactionDetails from "../../components/Transcation/TransactionDetails";

const TransactionDetailPage = () => {
	const { id } = useParams(); // This should capture the "id" from the route

	const { data: transaction, isLoading } = useGetTransactionDetailsQuery(id);

	console.log(transaction); // Debugging

	return isLoading ? (
		<Loader />
	) : transaction && transaction?.doc ? (
		<div>
			<TransactionDetails transaction={transaction?.doc[0]} />
		</div>
	) : (
		<NoDataFoundMessage message="Transaction data not found." />
	);
};

export default TransactionDetailPage;
