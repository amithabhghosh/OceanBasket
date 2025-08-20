import React from 'react'
import { AdminNavbar } from '../AdminComponents/AdminNavbar/AdminNavbar'
import { AdminCustomer } from '../AdminComponents/AdminCustomer/AdminCustomer'
import { useQuery } from '@tanstack/react-query';
import { getAllCustomers } from '../api/Admin';
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

export const AdminCustomerPage = () => {
const navigate = useNavigate()
  const adminToken = localStorage.getItem("adminToken")
const Customers = useQuery({
    queryKey: ['customer'],
    queryFn: () => getAllCustomers({adminToken}),
    keepPreviousData: true,
  });
if(Customers.isLoading){
  return <LoadingSpinner/>
}
if(Customers.isError){
  return navigate("/admin/login")
}
  return (
    <div>
      <div className="adminCustomerPageDesign" style={{display:"flex"}}>
  <AdminNavbar/>
        <AdminCustomer data={Customers.data} isError={Customers.isError} />
      </div>
      
    </div>
  )
}
