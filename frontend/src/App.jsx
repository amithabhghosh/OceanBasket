import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, createBrowserRouter,RouterProvider, useLocation} from 'react-router-dom'

import { ToastContainer } from 'react-toastify';

import  {checkTokenExpiration} from "./tokenExpiry"
import { LoginSignUp } from './CustomerPages/LoginSignUp'
import { DashboardPage } from './CustomerPages/DashboardPage'
import { PincodeManager } from './PincodeManager'
import { ShopDetailPage } from './CustomerPages/ShopDetailPage'


const router= createBrowserRouter([
  {path:"/",element:<LoginSignUp/>},
  
  {path:"/dashboard",element:<PincodeManager>
    <DashboardPage/>
    </PincodeManager>},
    {path:"/:ownerId",element:<PincodeManager>
      <ShopDetailPage/>
    </PincodeManager>}
  

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
