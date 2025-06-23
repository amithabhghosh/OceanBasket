import React, { useContext } from 'react'
import { ContextAPI } from '../Context/ContextAPI'
import { Navbar } from '../Components/Navbar/Navbar'
import { LoginNavbar } from '../Components/LoginNavbar/LoginNavbar'
import { Category } from '../Components/Category/Category'

export const BonyFish = () => {
  
    const {token,setToken,isLoggedIn,logout} = useContext(ContextAPI)
  return (
    <div>
             {isLoggedIn ?  <Navbar/> : <LoginNavbar/>}
             <Category/>
    </div>
  )
}
