import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { FishDetails } from '../CustomerComponents/FishDetails/FishDetails'
import { Footer } from '../CustomerComponents/Footer/Footer'

export const FishDetailPage = () => {
  return (
    <div>
        <Navbar/>
        <FishDetails/>
        <Footer/>
    </div>
  )
}
