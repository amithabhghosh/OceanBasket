import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { ShopPageBanner } from '../CustomerComponents/ShopPageBanner/ShopPageBanner'
import { ShopFishesSection } from '../CustomerComponents/ShopFishesSection/ShopFishesSection'
import { Footer } from '../CustomerComponents/Footer/Footer'
export const ShopDetailPage = () => {
  return (
    <div>
        <Navbar/>
        <ShopPageBanner/>
        <ShopFishesSection/>
        <Footer/>
    </div>
  )
}
