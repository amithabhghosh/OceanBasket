import React, { useContext } from 'react'
import { ContextAPI } from '../Context/ContextAPI'
import { Navbar } from '../Components/Navbar/Navbar'
import { LoginNavbar } from '../Components/LoginNavbar/LoginNavbar'
import { Category } from '../Components/Category/Category'
import { Footer } from '../Components/Footer/Footer'

export const BonyFish = () => {
  
    const {token,setToken,isLoggedIn,logout} = useContext(ContextAPI)
  return (
    <div>
             {isLoggedIn ?  <Navbar/> : <LoginNavbar/>}
             <Category/>
             <Footer/>
    </div>
  )
}
