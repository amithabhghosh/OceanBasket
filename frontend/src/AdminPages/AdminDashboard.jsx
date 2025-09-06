import React from 'react'
import { AdminNavbar } from '../AdminComponents/AdminNavbar/AdminNavbar'
import { getChartData } from '../api/Admin';
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner';
import { AdminAnaltytics } from '../AdminComponents/AdminAnalytics/AdminAnaltytics';
import { useQuery } from '@tanstack/react-query';

export const AdminDashboard = () => {
  const adminToken = localStorage.getItem("adminToken")
  const Data = useQuery({
      queryKey: ['data'],
      queryFn: () => getChartData({adminToken}),
      keepPreviousData: true,
    });

    if(Data.isLoading){
      return <LoadingSpinner/>
    }
  return (
     <div style={{ display: "flex" }}>
     <div style={{ position: "fixed", top: 0, left: 0, height: "100vh" }}>
       <AdminNavbar />
     </div>
     <div  className='adminRightPage'>
      <AdminAnaltytics data={Data.data}/>
     </div>
   </div>
  )
}
