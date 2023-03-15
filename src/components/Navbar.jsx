import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { saveAs } from 'file-saver';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import baseURL from '../baseURL';
import { toast } from 'react-toastify';

import { RiDatabaseLine } from 'react-icons/ri';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, setScreenSize, screenSize,logout,auth } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(false);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  const navigate=useNavigate();
  const [loader,setLoader]=useState(false);
  const navigateToLogin=()=>navigate("/login");
  let token=sessionStorage.getItem("token");
  let user = JSON.parse(sessionStorage.getItem("user"));

  const handleBackup = async()=>{
   
   setLoader(true);

   let data = await fetch(`${baseURL}/getAllData`);
   data = await data.json();

   if(data.success){

     const locations = JSON.stringify(data.message.locations);
     const incineration = JSON.stringify(data.message.incineration);
     const operator = JSON.stringify(data.message.operator);
  
     const blob = new Blob([locations], { type: 'application/json' });
     const blob2 = new Blob([incineration], { type: 'application/json' });
     const blob3 = new Blob([operator], { type: 'application/json' });
  
     saveAs(blob, 'locations.json');
     saveAs(blob2, 'incinerationProgress.json');
     saveAs(blob3, 'operators.json');
     setLoader(false)
     return
   }

   toast.error("Something Went Wrong while exporting");
   setLoader(false)
   
   
  }

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

      {auth && <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />}

      <div className="flex">

          {!token && <NavButton title="Login" icon={<BiLogIn/>} color={currentColor}  customFunc={navigateToLogin}/>}
          {token && <NavButton icon={<BiLogOut/>} title="LogOut"  color={currentColor}  customFunc={logout}/>}
          {auth && user.role==="admin"? <NavButton title={loader?"Exporting...":"Backup Data"} icon={<RiDatabaseLine/>} color={currentColor} customFunc={handleBackup}/>:null}

      </div>
    </div>
  );
};

export default Navbar;
