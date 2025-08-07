import React from 'react'
import { OwnerNavbar } from '../OwnerComponent/OwnerNavbar/OwnerNavbar'
import { FishAdd } from '../OwnerComponent/FishAdd/FishAdd'
import { getFishImageList } from '../api/owner';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner';
export const OwnerFishAdd = () => {
const ownerToken = localStorage.getItem("ownerToken")
  const getOwnerFishImageList = useQuery({
      queryKey: ['getOwnerImageList',ownerToken],
      queryFn: () => getFishImageList({ownerToken}),
      keepPreviousData: true,
    });

if(getOwnerFishImageList.isLoading){
  return <LoadingSpinner/>
}

  return (
    <div>
        <OwnerNavbar/>
        <FishAdd data={getOwnerFishImageList.data} isLoading={getOwnerFishImageList.isLoading} errors={getOwnerFishImageList.isError} refetch= {getOwnerFishImageList.refetch}/>
    </div>
  )
}
