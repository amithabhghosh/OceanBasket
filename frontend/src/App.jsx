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
import { FishDetailPage } from './CustomerPages/FishDetailPage'
import { CartPage } from './CustomerPages/CartPage'
import { ProfilePage } from './CustomerPages/ProfilePage'


const router= createBrowserRouter([
  {path:"/",element:<LoginSignUp/>},
  
  {path:"/dashboard",element:<PincodeManager>
    <DashboardPage/>
    </PincodeManager>},
    {path:"shop/:ownerId",element:<PincodeManager>
      <ShopDetailPage/>
    </PincodeManager>},
    {path:"fish/:fishId",element:<PincodeManager>
      <FishDetailPage/>
    </PincodeManager>},
    {path:"/cart",element:<PincodeManager>
      <CartPage/>
    </PincodeManager>},
    {path:"/profile",element:<PincodeManager>
      <ProfilePage/>
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
