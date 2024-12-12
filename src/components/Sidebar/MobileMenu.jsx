import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import SideBar from "./sideBar";


const MobileMenu = ({ isSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  return (
    <div className="">
      <button
        onClick={toggleDrawer(true)}
        className="text-4xl text-center text-white rounded-md hover:bg-primary-600"
      >
        <HiMenu />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleDrawer(false)}
          ></div>
          <div className="relative w-64 bg-primary-800 h-full shadow-lg">
            <button
              onClick={toggleDrawer(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <SideBar isSidebarOpen={isSidebarOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;