import React from 'react'
import { AdminNavbar } from '../AdminComponents/AdminNavbar/AdminNavbar'
import { AdminFishes } from '../AdminComponents/AdminFishes/AdminFishes'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAllFishes } from '../api/Admin'
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'
export const AdminFishesPage = () => {
 const navigate = useNavigate()
  const adminToken = localStorage.getItem("adminToken")
const fishes = useQuery({
    queryKey: ['fishes'],
    queryFn: () => getAllFishes({adminToken}),
    keepPreviousData: true,
  });
if(fishes.isLoading){
  return <LoadingSpinner/>
}
if(fishes.isError){
  return navigate("/admin/login")
}

  return (
    <div>
        <div style={{display:"flex"}}>
        <AdminNavbar/>
        <AdminFishes data={fishes.data} />
        </div>
    </div>
  )
}
