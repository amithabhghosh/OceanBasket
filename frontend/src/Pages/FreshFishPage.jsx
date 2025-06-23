import React, { useContext } from 'react'
import { ContextAPI } from '../Context/ContextAPI'
import { Navbar } from '../Components/Navbar/Navbar'
import { LoginNavbar } from '../Components/LoginNavbar/LoginNavbar'

export const FreshFishPage = () => {
    
      const {token,setToken,isLoggedIn,logout} = useContext(ContextAPI)
  return (
    <div>
               {isLoggedIn ?  <Navbar/> : <LoginNavbar/>}
    </div>
  )
}
