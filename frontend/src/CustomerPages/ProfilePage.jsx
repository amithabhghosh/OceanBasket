import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { Profile } from '../CustomerComponents/Profile/Profile'
import { Footer } from '../CustomerComponents/Footer/Footer'
export const ProfilePage = () => {
  return (
    <div>
         <Navbar/>
         <Profile/>
         <Footer/>
    </div>
  )
}
