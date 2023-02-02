import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';



ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
      <ToastContainer/>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
