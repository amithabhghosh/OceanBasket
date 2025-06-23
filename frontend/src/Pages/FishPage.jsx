import React, { useContext } from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { BreadCrum } from '../Components/BreadCrum/BreadCrum'
import { FishDetails } from '../Components/FishDetails/FishDetails'
import { RelatedFish } from '../Components/RelatedFish/RelatedFish'
import { Footer } from '../Components/Footer/Footer'
import { ContextAPI } from '../Context/ContextAPI'
import { LoginNavbar } from '../Components/LoginNavbar/LoginNavbar'

export const FishPage = () => {

  const {token,setToken,isLoggedIn,logout} = useContext(ContextAPI)
  return (
    <div>
       {isLoggedIn ?  <Navbar/> : <LoginNavbar/>}
        <FishDetails/>
        <RelatedFish/>
        <Footer/>
    </div>
  )
}
