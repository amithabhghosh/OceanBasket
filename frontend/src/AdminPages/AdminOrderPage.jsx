import React from 'react'
import { AdminNavbar } from '../AdminComponents/AdminNavbar/AdminNavbar'
import { AdminOrders } from '../AdminComponents/AdminOrders/AdminOrders'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '../api/Admin'
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'

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
    <div>
        <div style={{display:"flex"}}>
 <div style={{ position: "fixed", top: 0, left: 0, height: "100vh" }}>
    <AdminNavbar />
  </div>
    <div className='adminRightPage' >
        <AdminOrders data={orders.data} refetch = {orders.refetch} />
        </div>
        </div>
        
    </div>
  )
}
