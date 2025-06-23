import React, { useContext } from 'react'
import { ContextAPI } from '../Context/ContextAPI'
import { Navbar } from '../Components/Navbar/Navbar'
import { LoginNavbar } from '../Components/LoginNavbar/LoginNavbar'
import { Cart } from '../Components/Cart/Cart'


export const CartPage = () => {
      const {token,setToken,isLoggedIn,logout} = useContext(ContextAPI)
  return (
    <div>
    {isLoggedIn ?  <Navbar/> : <LoginNavbar/>}
    <Cart/>
    </div>
  )
}
