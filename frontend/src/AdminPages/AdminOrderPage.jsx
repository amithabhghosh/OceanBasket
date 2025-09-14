import React from 'react'
import { AdminNavbar } from '../AdminComponents/AdminNavbar/AdminNavbar'
import { AdminOrders } from '../AdminComponents/AdminOrders/AdminOrders'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '../api/Admin'
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'
import { AdminLayout } from '../AdminComponents/AdminLayout'

export const AdminOrderPage = () => {

 const navigate = useNavigate()
  const adminToken = localStorage.getItem("adminToken")
const orders = useQuery({
    queryKey: ['orders'],
    queryFn: () => getAllOrders({adminToken}),
    keepPreviousData: true,
  });
if(orders.isLoading){
  return <LoadingSpinner/>
}
if(orders.isError){
  return navigate("/admin/login")
}


  return (
 <AdminLayout>
    <AdminOrders data={orders.data} refetch = {orders.refetch} />
 </AdminLayout>
  
  )
}
