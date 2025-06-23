import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, createBrowserRouter,RouterProvider, useLocation} from 'react-router-dom'
import { HomePage } from './Pages/HomePage'
import { FishPage } from './Pages/FishPage'
import { ToastContainer } from 'react-toastify';
import { CartPage } from './Pages/CartPage'
import  {checkTokenExpiration} from "./tokenExpiry"
import { BonyFish } from './Pages/BonyFishPage'

const router= createBrowserRouter([
  {path:"/",element:<HomePage/>},
  {path:"/fish/:id",element:<FishPage/>},
  {path:"/cart",element:<CartPage/>},
  {path:"/:category",element:<BonyFish/>},

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
