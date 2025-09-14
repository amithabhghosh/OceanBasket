import React from 'react'
import { AdminNavbar } from '../AdminComponents/AdminNavbar/AdminNavbar'
import { getChartData } from '../api/Admin';
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner';
import { AdminAnaltytics } from '../AdminComponents/AdminAnalytics/AdminAnaltytics';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '../AdminComponents/AdminLayout';

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
   <AdminLayout>
     <AdminAnaltytics data={Data.data}/>
   </AdminLayout>
  )
}
