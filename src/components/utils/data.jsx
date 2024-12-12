import {
	FaTachometerAlt,
	FaUser,
	FaList,
	FaPlus,
	FaClipboardList,
	FaCarSide,
	FaUserTie,
	FaMoneyCheckAlt,
	FaFileInvoiceDollar,
} from "react-icons/fa";
import { GiCityCar } from "react-icons/gi";
import { TbBrandBootstrap } from "react-icons/tb";
import { BsFillFuelPumpDieselFill  } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";

export const sidebarItems = [
	{
		title: "Dashboard",
		path: "/",
		icon: <FaTachometerAlt />,
	},

	{
		title: "Booking",
		icon: <FaClipboardList />,
		subSections: [
	
			{
				title: "Car Booking",
				path: "/car-booking",
				icon: <TbBrandBooking />,
			},
			{
				title: "Booking List",
				path: "/car-bookingList",
				icon: <CiBoxList />,
			},
		],
	},
	{
		title: "Cars",
		icon: <FaCarSide />,
		subSections: [
		
			{
				title: "Car Details",
				path: "/car-Detail",
				icon: <FaList />,
			},
			{
				title: "Car List",
				path: "/car-DetailList",
				icon: <CiBoxList />,
			},
		
		
		],
	},
	{
		title: "Cars Fueling",
		icon: <FaCarSide />,
		subSections: [
			
			
			{
				title: "Car Fuel",
				path: "/car-fuel",
				icon: <BsFillFuelPumpDieselFill />,
			},
			{
				title: "Fueling List",
				path: "/car-fuelingList",
				icon: <CiBoxList />,
			},
		
		],
	},
	{
		title: "Card",
		icon: <FaUser />,
		subSections: [
		
			{
				title: "Card Details",
				path: "/card-Details",
				icon: <FaRegAddressCard />,
			},
			{
				title: "Card List",
				path: "/card-List",
				icon: <CiBoxList />,
			},
		],
	},

	{
	
		title: "Car Maintenance",
		icon: <FaMoneyCheckAlt />,
		subSections: [
			{
				title: "Car Mainteinance",
				path: "/car-mainteinance",
				icon: <FaPlus />,
			},
			{
				title: "Maintenance List",
				path: "/maintenance-List",
				icon: <CiBoxList />,
			},
	
		],

	},

];
