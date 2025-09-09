import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { useQuery } from '@tanstack/react-query'
import {  getOrderById } from '../api/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'
import { OrderDetail } from '../CustomerComponents/OrderDetail/OrderDetail'
import { Footer } from '../CustomerComponents/Footer/Footer'

export const OrderDetailPage = () => {
const {orderId} = useParams()
      const token = localStorage.getItem("userToken")
const navigate = useNavigate()
const customerOrders = useQuery({
    queryKey: ['customerOrders'],
    queryFn: () =>getOrderById({token,orderId}),
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
        <OrderDetail data={customerOrders.data}/>
        <Footer/>
    </div>
  )
}
