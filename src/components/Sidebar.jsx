import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { HiFire } from "react-icons/hi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useStateContext } from "../contexts/ContextProvider";
import { RiDashboard2Fill, RiLockPasswordFill } from "react-icons/ri";
import { GoDatabase } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { BsStack } from "react-icons/bs";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  let auth = JSON.parse(sessionStorage.getItem("user"));

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const links = [
    {
      title: "Dashboard",
      links: [
        {
          name: "dashboard",
          icon: <RiDashboard2Fill />,
        },
      ],
    },

    auth?.role === "admin"
      ? {
          title: "Pages",
          links: [
            {
              name: "Incineration Progress",
              icon: <GoDatabase />,
            },
            {
              name: "Add Incineration Progress",
              icon: <IoMdAdd />,
            },
            {
              name: "Locations",
              icon: <FaMapMarkerAlt />,
            },
            {
              name: "Add Operator Data",
              icon: <GrUserWorker />,
            },
            {
              name: "Operators Data",
              icon: <GoDatabase />,
            },
            {
              name: "Summary",
              icon: <BsStack />,
            },
            {
              name: "Change Password",
              icon: <RiLockPasswordFill />,
            },
          ],
        }
      : {
          title: "",
          links: [
            {
              name: "Change Password",
              icon: <RiLockPasswordFill />,
            },
          ],
        },
  ];

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <HiFire /> <span>INCINERATION</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name.replace(/\s/g, "")}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
