import { useParams } from "react-router-dom";
import { useGetAllUserDetailsQuery } from "../../redux/slices/usersApiSlice";
import Loader from "../../components/shared/Loader";
import NoDataFoundMessage from "../../components/shared/NoDataFoundMessage";
import UserDetails from "./../../components/Vendor/UserDetails";

const UserDetailPage = () => {
	const { id } = useParams();

	const { data: user, isLoading } = useGetAllUserDetailsQuery(id);

	console.log(user);

	return isLoading ? (
		<Loader />
	) : user && user?.doc ? (
		<div>
			<UserDetails user={user?.doc} />
		</div>
	) : (
		<NoDataFoundMessage message="User data not found." />
	);
};

export default UserDetailPage;
