import React from 'react'
import { AdminNavbar } from '../AdminComponents/AdminNavbar/AdminNavbar'
import { AdminOwner } from '../AdminComponents/AdminOwner/AdminOwner'
import { useNavigate } from 'react-router-dom'
import { getAllOwners } from '../api/Admin'
import { useQuery } from '@tanstack/react-query'
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'

export const AdminOwnerPage = () => {

  const navigate = useNavigate()
  const adminToken = localStorage.getItem("adminToken")
const owners = useQuery({
    queryKey: ['owners'],
    queryFn: () => getAllOwners({adminToken}),
    keepPreviousData: true,
  });
if(owners.isLoading){
  return <LoadingSpinner/>
}
if(owners.isError){
  return navigate("/admin/login")
}
  return (
   <div style={{ display: "flex" }}>
  <div style={{ position: "fixed", top: 0, left: 0, height: "100vh" }}>
    <AdminNavbar />
  </div>
  <div  className='adminRightPage'>
    <AdminOwner data={owners.data} refetch={owners.refetch} />
  </div>
</div>

  )
}
