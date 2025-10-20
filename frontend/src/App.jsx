import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, createBrowserRouter,RouterProvider, useLocation} from 'react-router-dom'

import { ToastContainer } from 'react-toastify';

import  {checkTokenExpiration} from "./tokenExpiry"
import { LoginSignUp } from './CustomerPages/LoginSignUp'
import { DashboardPage } from './CustomerPages/DashboardPage'

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
import { LocationManager } from './LocationManager'
import { CustomerAuth } from './AuthRoutes/CustomerAuth'
import { OwnerAuth } from './AuthRoutes/OwnerAuth'
import { AdminAuth } from './AuthRoutes/AdminAuth'
import { OwnerOrderTracking } from './OwnerComponent/OwnerOrderTracking'
import { PrivacyPage } from './CustomerPages/PrivacyPage'
import { TermsPage } from './CustomerPages/TermsPage'



const router= createBrowserRouter([
  {path:"/",element:<LoginSignUp/>},
  
  {path:"/dashboard",element:
    <LocationManager> <DashboardPage/></LocationManager>
   
   },
    {path:"shop/:ownerId",element:
      <ShopDetailPage/>
    },
    {path:"fish/:fishId",element:
      <FishDetailPage/>
    },
    {path:"/cart",element:
      <CustomerAuth><CartPage/></CustomerAuth>
      
    },
    {path:"/profile",element:
      <CustomerAuth> <ProfilePage/></CustomerAuth>
     
  },
    {path:"/Name/:fishName",element:
      <FishPage/>
   },
    {path:"/checkout",element:<CustomerAuth><CheckoutPage/></CustomerAuth>},
    {path:"/order/:orderId",element:<CustomerAuth><OrderDetailPage/></CustomerAuth>},


    {path:"/ownerSignUp",element:<OwnerSignUp/>},
  {path:"/ownerDashboard",element:<OwnerAuth>
    <OwnerOrderTracking>
    <OwnerDashboard/>
    </OwnerOrderTracking>
    </OwnerAuth>}
  ,{path:"/ownerProfile",element:<OwnerAuth>   <OwnerOrderTracking><OwnerProfilePage/>   </OwnerOrderTracking></OwnerAuth>},
  {path:"/owner/fish/:fishId",element:<OwnerAuth><OwnerOrderTracking><OwnerFishDetails/>  </OwnerOrderTracking></OwnerAuth>},
  {path:"/owner/addFish",element:<OwnerAuth><OwnerOrderTracking><OwnerFishAdd/></OwnerOrderTracking></OwnerAuth>},
  {path:"/owner/orders",element:<OwnerAuth><OwnerOrderTracking><OrderList/></OwnerOrderTracking></OwnerAuth>},




  {path:"/admin/login",element:<AdminLoginPage/>},
  {path:"/admin/analatics",element:<AdminDashboard/>},
  {path:"/admin/customer",element:
  <AdminAuth>
  <AdminOrderTracking>
    <AdminCustomerPage/>
    </AdminOrderTracking>
    </AdminAuth>},
  {path:"/admin/owner",element:
  <AdminAuth>
  <AdminOrderTracking>
    <AdminOwnerPage/>
  </AdminOrderTracking>
  </AdminAuth>},
  {path:"/admin/fishes",element:<AdminAuth><AdminOrderTracking><AdminFishesPage/></AdminOrderTracking></AdminAuth>},
{path:"admin/addOwner",element:<AdminAuth><AdminOrderTracking><AdminAddOwnerPage/></AdminOrderTracking></AdminAuth>},
{path:"/admin/orders",element:<AdminAuth><AdminOrderTracking><AdminOrderPage/></AdminOrderTracking></AdminAuth>},


{path:"/privacy-policy",element:<PrivacyPage/>},
{path:"/terms-and-condition",element:<TermsPage/>}
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
