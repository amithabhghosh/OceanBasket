import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { CartComponent } from '../CustomerComponents/CartComponent/CartComponent'
import { Footer } from '../CustomerComponents/Footer/Footer'
import { getCart } from '../api/auth'
import { useQuery } from '@tanstack/react-query'
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'

export const CartPage = () => {

  const token = localStorage.getItem("userToken")
 const cartData = useQuery({
      queryKey: ['getCart',token],
      queryFn: () => getCart({token}),
      keepPreviousData: true,
    });

    if(cartData.isLoading){
      return <LoadingSpinner/>
    }

  return (
    <div>
        <Navbar/>
        <CartComponent data = {cartData.data} refetch={cartData.refetch}/>
        <Footer/>
    </div>
  )
}
