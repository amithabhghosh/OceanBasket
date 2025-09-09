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
import { AdminLoginPage } from './AdminPages/AdminLoginPage'
import { AdminDashboard } from './AdminPages/AdminDashboard'
import { AdminCustomerPage } from './AdminPages/AdminCustomerPage'
import { AdminOwnerPage } from './AdminPages/AdminOwnerPage'
import { AdminFishesPage } from './AdminPages/AdminFishesPage'
import { AdminAddOwnerPage } from './AdminPages/AdminAddOwnerPage'
import { AdminOrderPage } from './AdminPages/AdminOrderPage'
import { AdminOrderTracking } from './AdminComponents/AdminOrderTracking/AdminOrderTracking'



const router= createBrowserRouter([
  {path:"/",element:<LoginSignUp/>},
  
  {path:"/dashboard",element:
    <DashboardPage/>
   },
    {path:"shop/:ownerId",element:
      <ShopDetailPage/>
    },
    {path:"fish/:fishId",element:
      <FishDetailPage/>
    },
    {path:"/cart",element:
      <CartPage/>
    },
    {path:"/profile",element:
      <ProfilePage/>
  },
    {path:"/Name/:fishName",element:
      <FishPage/>
   },
    {path:"/checkout",element:<CheckoutPage/>},
    {path:"/order/:orderId",element:<OrderDetailPage/>},
    {path:"/ownerSignUp",element:<OwnerSignUp/>},
  {path:"/ownerDashboard",element:<OwnerDashboard/>}
  ,{path:"/ownerProfile",element:<OwnerProfilePage/>},
  {path:"/owner/fish/:fishId",element:<OwnerFishDetails/>},
  {path:"/owner/addFish",element:<OwnerFishAdd/>},
  {path:"/owner/orders",element:<OrderList/>},




  {path:"/admin/login",element:<AdminLoginPage/>},
  {path:"/admin/analatics",element:<AdminDashboard/>},
  {path:"/admin/customer",element:<AdminOrderTracking>
    <AdminCustomerPage/>
    </AdminOrderTracking>},
  {path:"/admin/owner",element:<AdminOrderTracking>
    <AdminOwnerPage/>
  </AdminOrderTracking>},
  {path:"/admin/fishes",element:<AdminOrderTracking><AdminFishesPage/></AdminOrderTracking>},
{path:"admin/addOwner",element:<AdminOrderTracking><AdminAddOwnerPage/></AdminOrderTracking>},
{path:"/admin/orders",element:<AdminOrderTracking><AdminOrderPage/></AdminOrderTracking>}

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
