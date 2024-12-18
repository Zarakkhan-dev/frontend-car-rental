import { createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login"; // Adjust path and case if necessary
import ProtectedRoute from "./components/protectedRoutes";

import Dashboard from "./components/DashBoard/Dashboard.jsx";
import CarBookingForm from "./components/Carbooking/carBooking";
import CarDetailsForm from "./components/Car/Car";

import FuelingAndMaintenanceForm from "./components/CarFuel/carFuel";
import CarMaintenanceForm from "./components/Carmaintenance/carMaintainance";
import CarBookingList from "./components/Carbooking/carBookingList";
import CarDetailsTable from "./components/Car/carList";
import CardPaymentList from "./components/Card/cardList";
import FuelingList from "./components/CarFuel/carFuelingList";

import CardDetails from "./components/Card/Card";
import SignUpForm from "./components/Signup/signUp";
import RootLayout from "./_root/RootLayout";
import CarMaintenenceList from "./components/Carmaintenance/carMaintenanceList";
import UpdateCarForm from "./components/Car/carUpdate";
import CarBookingUpdate from "./components/carBooking/bookingUpdate";
import CardUpdate from "./components/Card/cardUpdate";
import FuelingUpdate from "./components/carFuel/fuelUpdate";
import CarMaintenanceUpdate from "./components/Carmaintenance/maintainenceUpdate";
import DriverDetailsForm from "./components/Driver/Driver";
import DriverDetailsTable from "./components/Driver/driverList";



const router = createBrowserRouter([
	{
		path:"/login",
		element:<Login/>
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
