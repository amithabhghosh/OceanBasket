import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { CartComponent } from '../CustomerComponents/CartComponent/CartComponent'
import { Footer } from '../CustomerComponents/Footer/Footer'

export const CartPage = () => {
  return (
    <div>
        <Navbar/>
        <CartComponent/>
        <Footer/>
    </div>
  )
}
