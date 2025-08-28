import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { CheckoutSection } from '../CustomerComponents/CheckoutSection/CheckoutSection'
import { getCart, getProfile } from '../api/auth';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner';
export const CheckoutPage = () => {
  
const token = localStorage.getItem("userToken")
    const getAddressOfUser = useQuery({
    queryKey: ['getAddressProfile',token ],
    queryFn: () =>getProfile({token}),
    keepPreviousData: true,
  });

  const getCartData = useQuery({
     queryKey: ['getCartData',token ],
    queryFn: () =>getCart({token}),
    keepPreviousData: true,
  })
const loading = getAddressOfUser.isLoading || getCartData.isLoading

if(loading){
    return <LoadingSpinner/>
}

const error = getAddressOfUser.isError || getCartData.isError
if(error){
    return <p>Error</p>
}
  return (
    <div>
       <Navbar/> 
       <CheckoutSection cartData = {getCartData.data} personalData = {getAddressOfUser.data} />
    </div>
  )
}
