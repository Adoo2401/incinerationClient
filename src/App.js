import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Summary from './pages/Summary'
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Dashboard, IncinerationProgress, Stacked, Line, Pie, ColorMapping } from './pages';
import './App.css';
import WeeklySummary from './pages/WeeklySummary'
import Location from './pages/Location'
import { useStateContext } from './contexts/ContextProvider';
import AddIncinerationProgress from './pages/AddIncinerationProgress';
import Protect from './secure/Protect';
import Login from './pages/Login';
import AddOperator from './pages/AddOperator';
import OperatorDatas from './pages/OperatorData';
import OperatorSummary from './pages/operatorSummary';
import EditIncinerationProgress from './pages/EditIncinerationProgress';
import baseURL from './baseURL';

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

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
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
                {/* dashboard  */}
                <Route path="/" element={(<Dashboard />)} />
                <Route path="/dashboard" element={(<Dashboard />)} />
              <Route element={<Protect/>}>

                {/* pages  */}
                <Route path="/AddIncinerationProgress" element={<AddIncinerationProgress/>}/>
                <Route path="/IncinerationProgress" element={<IncinerationProgress />} />
                <Route path="/AddOperatorData" element={<AddOperator/>} />
                <Route path="/OperatorsData" element={<OperatorDatas/>}/>
                <Route path="/Summary" element={<Summary/>}/>
                <Route path="/Locations" element={<Location/>}/>
                <Route path="/editIncinerationProgress/:id" element={<EditIncinerationProgress/>}/>


    
              </Route>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
