import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./Components/auth/Login";
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
import CarMaintenenceList from "./Components/Carmaintenance/carMaintenanceList";
import UpdateCarForm from "./Components/Car/carUpdate";
import CarBookingUpdate from "./Components/carBooking/bookingUpdate";
import CardUpdate from "./Components/Card/cardUpdate";
import FuelingUpdate from "./Components/carFuel/fuelUpdate";
import CarMaintenanceUpdate from "./Components/Carmaintenance/maintainenceUpdate";
import DriverDetailsForm from "./Components/Driver/Driver";
import DriverDetailsTable from "./Components/Driver/driverList";



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
				path : "/driver",
				element : <DriverDetailsForm/>
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
				path: "/Driver-Detail",

				element: <DriverDetailsForm />,
			},
			{
				path: "/Driver-DetailList",

				element: <DriverDetailsTable />,
			},
			{
				path: "/UpdateDriverForm/:id",

				element: <updateDriverForm />,
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
