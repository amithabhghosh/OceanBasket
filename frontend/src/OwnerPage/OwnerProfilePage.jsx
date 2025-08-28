import React from 'react'
import { OwnerNavbar } from '../OwnerComponent/OwnerNavbar/OwnerNavbar'
import { OwnerProfile } from '../OwnerComponent/OwnerProfile/OwnerProfile'
import { getOwnerData } from '../api/owner';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner';

export const OwnerProfilePage = () => {
  const navigate = useNavigate()
  const ownerToken = localStorage.getItem("ownerToken")
const getOwnerData = useQuery({
      queryKey: ['getOwnerData'],
      queryFn: () => getOwnerData({ownerToken}),
      keepPreviousData: true,
    });
    if(getOwnerData.isLoading){
        return <LoadingSpinner/>
    }
if(!getOwnerData.success){
navigate("/ownerSignUp")
}
  return (
    <div>
        <OwnerNavbar/>
        <OwnerProfile data={getOwnerData.data} refetch={getOwnerData.refetch} />
    </div>
  )
}
