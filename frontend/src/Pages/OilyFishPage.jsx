import React, { useContext } from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { ContextAPI } from '../Context/ContextAPI'
import { LoginNavbar } from '../Components/LoginNavbar/LoginNavbar'

export const OilyFishPage = () => {
    
      const {token,setToken,isLoggedIn,logout} = useContext(ContextAPI)
  return (
    <div>
               {isLoggedIn ?  <Navbar/> : <LoginNavbar/>}
    </div>
  )
}
