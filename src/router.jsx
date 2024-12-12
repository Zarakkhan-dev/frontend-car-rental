import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./Components/auth/login";
import ProtectedRoute from "./Components/protectedRoutes";

import Dashboard from "./Components/Dashboard/dashBoard";
import CarBookingForm from "./Components/Carbooking/carBooking";
import CarDetailsForm from "./Components/Car/Car";

import FuelingAndMaintenanceForm from "./Components/CarFuel/carFuel";
import CarMaintenanceForm from "./Components/Carmaintenance/carMaintainance";
import CarBookingList from "./Components/Carbooking/carBookingList";
import CarDetailsTable from "./Components/Car/carList";
import CardPaymentList from "./Components/Card/cardList";
import FuelingList from "./Components/CarFuel/carFuelingList";

import CardDetails from "./Components/Card/Card";
import SignUpForm from "./Components/Signup/signUp";
import RootLayout from "./_root/RootLayout";
import CarMaintenenceList from "./components/Carmaintenance/carMaintenanceList";
import UpdateCarForm from "./components/Car/carUpdate";
import CarBookingUpdate from "./components/carBooking/bookingUpdate";
import CardUpdate from "./components/Card/cardUpdate";
import FuelingUpdate from "./components/carFuel/fuelUpdate";
import CarMaintenanceUpdate from "./components/Carmaintenance/maintainenceUpdate";

const router = createBrowserRouter([
	{
		path:"/login",
		element:<LoginPage/>
	},
		{
				path: "/SignUp",

				element: <SignUpForm />,
			},
	{
		path: "/",
		element: (
		  <ProtectedRoute>
			<RootLayout />
		  </ProtectedRoute>
		),
		children: [
			
			{
				path: "/",
				element: <Dashboard />,
			},

			
			{
				path: "/car-booking",

				element: <CarBookingForm />,
			},
			{
				path: "/car-bookingList",

				element: <CarBookingList />,
			},
			{
				path: "/CarBookingUpdate/:id",

				element: <CarBookingUpdate />,
			},
			
			{
				path: "/car-Detail",

				element: <CarDetailsForm />,
			},
			{
				path: "/car-DetailList",

				element: <CarDetailsTable />,
			},
			{
				path: "/UpdateCarForm/:id",

				element: <UpdateCarForm />,
			},
			{
				path: "/card-Details",

				element: <CardDetails />,
			},
			{
				path: "/card-List",

				element: <CardPaymentList />,
			},
			{
				path: "/CardUpdate/:id",

				element: <CardUpdate />,
			},
			{
				path: "/car-fuel",

				element: <FuelingAndMaintenanceForm />,
			},
			{
				path: "/car-fuelingList",

				element: <FuelingList />,
			},
			{
				path: "/FuelingUpdate/:id",

				element: <FuelingUpdate />,
			},
			{
				path: "/car-mainteinance",

				element: <CarMaintenanceForm />,
			},
			{
				path: "/maintenance-List",

				element: <CarMaintenenceList />,
			},
			{
				path: "/CarMaintenanceUpdate/:id",

				element: <CarMaintenanceUpdate />,
			},
			
		
		],
	},
]);

export default router;
