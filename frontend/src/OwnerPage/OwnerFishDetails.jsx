import React from 'react'
import { OwnerNavbar } from '../OwnerComponent/OwnerNavbar/OwnerNavbar'
import { useParams } from 'react-router-dom'
import { getFishDetail } from '../api/owner'
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'
import {OwnerFishDetail} from "../OwnerComponent/OwnerFishDetail/OwnerFishDetail"
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
export const OwnerFishDetails = () => {
    const {fishId} = useParams()
    const getOwnerFishDetail = useQuery({
      queryKey: ['getFishDetail'],
      queryFn: () => getFishDetail({fishId}),
      keepPreviousData: true,
    });
    if(getOwnerFishDetail.isLoading){
        return <LoadingSpinner/>
    }
  return (
    <div>
        <OwnerNavbar/>

        <OwnerFishDetail data={getOwnerFishDetail.data} isLoading={getOwnerFishDetail.isLoading} isError={getOwnerFishDetail.isError}/>
    </div>
  )
}
