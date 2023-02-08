import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Summary from './pages/Summary'
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Dashboard, IncinerationProgress } from './pages';
import ManagerRoutes from './secure/ManagerRoutes'
import './App.css';
import Location from './pages/Location'
import { useStateContext } from './contexts/ContextProvider';
import AddIncinerationProgress from './pages/AddIncinerationProgress';
import AdminRoutes from './secure/AdminRoutes';
import Login from './pages/Login';
import AddOperator from './pages/AddOperator';
import OperatorDatas from './pages/OperatorData';
import EditIncinerationProgress from './pages/EditIncinerationProgress';
import PasswordChange from './pages/PasswordChange';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings,auth } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    let token=sessionStorage.getItem("user");
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }


  }, []);

  const [show,setShow]=useState(true)

useEffect(()=>{

  setTimeout(()=>{

    setShow(false)
  },5000)

},[])


  return (
    <div  data-aos="zoom-in-left" data-aos-duration="1000" className={currentMode === 'Dark' ? 'dark' : ''}>
      {show?<div style={{height:"100vh",width:"100vw"}}>
      <img src="./Page.jpeg" alt=""  style={{height:"100%"}} width="100%"/>
    </div>:
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              {auth?<Sidebar />:null}
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              {auth?<Sidebar />:null}
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

            <Routes>
              {/* Manager or admin routes */}
              
              
                <Route element={<ManagerRoutes/>}>
                   <Route path="/" element={(<Dashboard />)} />
                   <Route path="/dashboard" element={(<Dashboard />)} />
                </Route>



                <Route element={<AdminRoutes/>}>

                    {/* Only Admin Routes */}
                    <Route path="/AddIncinerationProgress" element={<AddIncinerationProgress/>}/>
                    <Route path="/IncinerationProgress" element={<IncinerationProgress />} />
                    <Route path="/AddOperatorData" element={<AddOperator/>} />
                    <Route path="/OperatorsData" element={<OperatorDatas/>}/>
                    <Route path="/Summary" element={<Summary/>}/>
                    <Route path="/Locations" element={<Location/>}/>
                    <Route path="/editIncinerationProgress/:id" element={<EditIncinerationProgress/>}/>
               </Route>
                <Route path='/changePassword' element={<PasswordChange/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>}
    </div>
  );
};

export default App;
