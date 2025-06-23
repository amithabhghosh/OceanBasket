import React, { useContext } from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { Banner } from '../Components/Banner/Banner'
import { DailyDeals } from '../Components/DailyDeals/DailyDeals'
import { FeaturedShops } from '../Components/FeaturedShops/FeaturedShops'
import { ShopCategory } from '../Components/ShopCategory/ShopCategory'
import { Footer } from '../Components/Footer/Footer'
import { AllFish } from '../Components/AllFishes/AllFish'
import { ContextAPI } from '../Context/ContextAPI'
import { LoginNavbar } from '../Components/LoginNavbar/LoginNavbar'

export const HomePage = () => {
  const {token,setToken,isLoggedIn,logout} = useContext(ContextAPI)
  return (
    <div>
      {isLoggedIn ?  <Navbar/> : <LoginNavbar/>}
    
     <ShopCategory/>
     <Banner/>
     <DailyDeals/>
     <AllFish/>
     <FeaturedShops/>
     <Footer/>
    </div>
  )
}
