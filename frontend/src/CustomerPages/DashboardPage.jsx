import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { ShopsSection } from '../CustomerComponents/ShopsSection/ShopsSection'
import { TopSelling } from '../CustomerComponents/TopSelling/TopSelling'
import { HomeFishesList } from '../CustomerComponents/HomeFishesList/HomeFishesList'
import { HomeBanner } from '../CustomerComponents/HomeBanner/HomeBanner'
import {Footer} from "../CustomerComponents/Footer/Footer"
import {PreBook} from "../CustomerComponents/PreBook/PreBook"
export const DashboardPage = () => {
    
  return (

    <div>
        <Navbar/>
        <HomeBanner/>
        <ShopsSection/>
        <TopSelling/>
        <HomeFishesList/>
        <PreBook/>
        <Footer/>
    </div>
  )
}
