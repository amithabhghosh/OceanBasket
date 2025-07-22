import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { ShopsSection } from '../CustomerComponents/ShopsSection/ShopsSection'
import { TopSelling } from '../CustomerComponents/TopSelling/TopSelling'
import { HomeFishesList } from '../CustomerComponents/HomeFishesList/HomeFishesList'

export const DashboardPage = () => {
    
  return (

    <div>
        <Navbar/>
        <ShopsSection/>
        <TopSelling/>
        <HomeFishesList/>
    </div>
  )
}
