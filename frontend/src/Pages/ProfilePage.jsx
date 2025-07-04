import React, { useContext } from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { LoginNavbar } from '../Components/LoginNavbar/LoginNavbar'
import { ContextAPI } from '../Context/ContextAPI'
import { Profile } from '../Components/Profile/Profile'

export const ProfilePage = () => {
      const {token,setToken,isLoggedIn,logout} = useContext(ContextAPI)
  return (
    <div>
  {isLoggedIn ?  <Navbar/> : <LoginNavbar/>}
  <Profile/>
    </div>
  )
}
