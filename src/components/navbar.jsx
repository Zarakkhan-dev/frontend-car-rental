import { useState } from 'react';
import { FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex justify-between items-start p-2 text-white overflow-x-hidden">
      <div className="flex items-center space-x-4 mr-10 ">
        <button onClick={toggleDarkMode} className="text-2xl border-2 rounded-full p-1 ">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
       

<div className="border-2 rounded-full">
  {/* <Link to="/login" title="Go to Profile"> */}
    <FaUserCircle className="text-2xl" />
  {/* </Link> */}
</div>

        
      </div>
    </div>
  );
};

export default Navbar;