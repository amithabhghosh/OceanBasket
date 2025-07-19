import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, createBrowserRouter,RouterProvider, useLocation} from 'react-router-dom'

import { ToastContainer } from 'react-toastify';

import  {checkTokenExpiration} from "./tokenExpiry"
import { LoginSignUp } from './CustomerPages/LoginSignUp'
import { DashboardPage } from './CustomerPages/DashboardPage'


const router= createBrowserRouter([
  {path:"/",element:<LoginSignUp/>},
  {path:"/dashboard",element:<DashboardPage/>}
])

function App() {

 useEffect(() => {
    checkTokenExpiration();
  }, []);

  return (
    <>
         <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
