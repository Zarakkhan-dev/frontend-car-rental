import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";


import { ToastContainer } from "react-toastify";
import SideBar from "../Components/sidebar/sideBar";
import MobileMenu from "../Components/sidebar/mobileMenu";
import Navbar from "../Components/navbar";

const RootLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="relative flex">
			<div
				className={`fixed top-0 left-0 h-full bg-primary-800 overflow-y-auto scrollbar-hide ${
					sidebarOpen ? "w-52 lg:block  hidden" : "w-16 lg:block hidden"
				} `}
			>
				<SideBar isSidebarOpen={sidebarOpen} />
			</div>

			{/* Main content */}
			<div
				className={`flex flex-col flex-1 ${
					sidebarOpen ? "lg:ml-52" : "lg:ml-16"
				}`}
			>
				{/* Navbar */}
				<div
					className={`fixed top-0 left-0 right-0 py-2 flex justify-between items-center px-16 bg-primary-900 z-10  ${
						sidebarOpen ? "lg:left-52" : "lg:left-16"
					}`}
				>
					<button
						onClick={toggleSidebar}
						className="text-white text-2xl hidden lg:block"
					>
						<FaBars />
					</button>
					<div className="block md:hidden">
						<MobileMenu isSidebarOpen={true} />
					</div>
					<div>
						<Navbar />
					</div>
				</div>

				{/* Outlet */}
				<div className="min-h-[100vh] mt-16 p-4 bg-white w-full">
					<Outlet />
				</div>

				<ToastContainer />
			</div>
		</div>
	);

};

export default RootLayout;
