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
import { FishPage } from './CustomerPages/FishPage'
import { OwnerSignUp } from './OwnerPage/OwnerSignUp'
import { OwnerDashboard } from './OwnerPage/OwnerDashboard'
import { OwnerProfilePage } from './OwnerPage/OwnerProfilePage'
import { OwnerFishDetails } from './OwnerPage/OwnerFishDetails'
import { OwnerFishAdd } from './OwnerPage/OwnerFishAdd'
import { CheckoutPage } from './CustomerPages/CheckoutPage'
import { OrderDetailPage } from './CustomerPages/OrderDetailPage'
import { OrderList } from './OwnerPage/OrderList'


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
    </PincodeManager>},
    {path:"/Name/:fishName",element:<PincodeManager>
      <FishPage/>
    </PincodeManager>},
    {path:"/checkout",element:<CheckoutPage/>},
    {path:"/order/:orderId",element:<OrderDetailPage/>},
    {path:"/ownerSignUp",element:<OwnerSignUp/>},
  {path:"/ownerDashboard",element:<OwnerDashboard/>}
  ,{path:"/ownerProfile",element:<OwnerProfilePage/>},
  {path:"/owner/fish/:fishId",element:<OwnerFishDetails/>},
  {path:"/owner/addFish",element:<OwnerFishAdd/>},
  {path:"/owner/orders",element:<OrderList/>}

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
