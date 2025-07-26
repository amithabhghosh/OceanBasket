import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { CartComponent } from '../CustomerComponents/CartComponent/CartComponent'

export const CartPage = () => {
  return (
    <div>
        <Navbar/>
        <CartComponent/>
    </div>
  )
}
