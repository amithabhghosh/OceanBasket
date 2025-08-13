import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { Profile } from '../CustomerComponents/Profile/Profile'
import { Footer } from '../CustomerComponents/Footer/Footer'
import { OrderList } from '../CustomerComponents/OrderList/OrderList'
import { useQuery } from '@tanstack/react-query'
import { getOrderByCustomer } from '../api/auth'
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'
import { useNavigate } from 'react-router-dom'
export const ProfilePage = () => {
  const token = localStorage.getItem("userToken")
const navigate = useNavigate()
const customerOrders = useQuery({
    queryKey: ['customerOrders'],
    queryFn: () => getOrderByCustomer({token}),
    keepPreviousData: true,
  });

if(customerOrders.isLoading){
  return <LoadingSpinner/>
}

console.log(customerOrders.data)
if(customerOrders.isError){
  return navigate("/")
}
  return (
    <div>
         <Navbar/>
         <Profile/>
           <OrderList data={customerOrders?.data}  />
         <Footer/>
       
    </div>
  )
}
