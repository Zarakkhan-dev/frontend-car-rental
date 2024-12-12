import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretRight, FaCaretDown } from "react-icons/fa";
import PropTypes from "prop-types";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { sidebarItems } from "../../Components/utils/data";
import logo from '../../assets/logo/logo-side.png'

const SideBar = ({ isSidebarOpen }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseEnter = (index, event) => {
    if (!isSidebarOpen) {
      setHoveredItem(index);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMouseLeave = () => {
    if (!isSidebarOpen) {
      setHoveredItem(null);
      setAnchorEl(null);
    }
  };

  // const handleClick = (index) => {
  //   if (isSidebarOpen) {
  //     setClickedItem((prevClickedItem) =>
  //       prevClickedItem === index ? null : index
  //     );
  //   }
  // };
  const handleClick = (index, event, hasSubSections) => {
    if (hasSubSections) {
      event.preventDefault();
      setClickedItem((prevClickedItem) =>
        prevClickedItem === index ? null : index
      );
    }
  };

  return (
    <div className="h-full backdrop-blur mx-auto text-white">
      <div className="md:block sm:hidden">
        <div className="flex items-center">
          {isSidebarOpen ? (
            <img src={logo} alt="Logo" className="h-20" />
          ) : (
            <img src={logo} alt="Logo" className="w-20 p-4" />
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center opacity-70 ">
        {sidebarItems.map((section, index) => {
          const content = (
            <div className="fixed w-48 -top-6 -ml-2 flex flex-col justify-center min-h-16 pl-4 py-2 bg-primary-700 rounded-r-[10px] justify-start">
              <div className="-ml-4 text-white ">{section.title}</div>
              {section.subSections &&
                section.subSections.map((subItem, subIndex) => (
                  <Link
                    to={subItem.path}
                    key={subIndex}
                    className="flex items-center gap-2 p-2 mx-2 text-white hover:text-white hover:bg-primary-500 "
                  >
                    {subItem.icon}
                    {subItem.title}
                  </Link>
                ))}
            </div>
          );

          return (
            <div
              key={index}
              onMouseEnter={(event) => handleMouseEnter(index, event)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            >
              <Popper
                open={!isSidebarOpen && hoveredItem === index}
                anchorEl={anchorEl}
                placement="right"
                transition
                sx={{ zIndex: 1200 }}
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={700}>
                    <Paper>{content}</Paper>
                  </Fade>
                )}
              </Popper>

              <div className="relative flex mx-auto">
                <Link
                  to={section.path}
                  onClick={(event) =>
                    handleClick(index, event, section.subSections)
                  }
                >
                  <div
                    className={`relative flex gap-4 w-52 hover:bg-primary-700 p-4 rounded-full transition-all rounded-full duration-300 ease-in-out text-white`}
                  >
                    <div className="flex items-center text-xl">
                      {section.icon}
                    </div>
                    <div
                      className={`flex items-center w-full justify-between transition-transform duration-300 ease-in-out ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-10"
                      }`}
                    >
                      <div>
                        {isSidebarOpen && (
                          <div className={`whitespace-nowrap`}>
                            {section.title}
                          </div>
                        )}
                      </div>
                      <div>
                        {isSidebarOpen && section.subSections && (
                          <div className="text-white ">
                            {clickedItem === index ? (
                              <FaCaretDown />
                            ) : (
                              <FaCaretRight />
                            )}
                          </div>
                        )}
                      </div>
                      {/* {isSidebarOpen && section.subSections && (
                        <div className="text-white ">
                          {clickedItem === index ? (
                            <FaCaretDown />
                          ) : (
                            <FaCaretRight />
                          )}
                        </div>
                      )} */}
                    </div>
                  </div>
                </Link>
              </div>

              {section.subSections && (
                <div
                  className={`${
                    isSidebarOpen && clickedItem === index ? "block" : "hidden"
                  } 
                   transition-all duration-300 ease-in-out p-2`}
                >
                  {section.subSections.map((subSection, subIndex) => (
                    <Link
                      to={subSection.path}
                      key={subIndex}
                      className="flex items-center p-2 hover:bg-primary-700 pl-4 rounded-full text-white"
                    >
                      <div className="flex  pr-2 justify-center transition-transform duration-300 ease-in-out">
                        {subSection.icon}
                      </div>
                      <span
                        className={`transition-transform duration-300 ease-in-out ${
                          isSidebarOpen ? "translate-x-0" : "-translate-x-10"
                        }`}
                      >
                        {subSection.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

SideBar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default SideBar;
