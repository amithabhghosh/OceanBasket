import React from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { ShopPageBanner } from '../CustomerComponents/ShopPageBanner/ShopPageBanner'
import { ShopFishesSection } from '../CustomerComponents/ShopFishesSection/ShopFishesSection'
import { Footer } from '../CustomerComponents/Footer/Footer'
import { getShopByShopId } from '../api/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'
export const ShopDetailPage = () => {


    const {ownerId} = useParams()
    console.log(ownerId)
      const getShopDetails = useQuery({
    queryKey: ['getShopById',ownerId],
    queryFn: () => getShopByShopId({ ownerId}),
    keepPreviousData: true,
  });

if(getShopDetails.isLoading){
  return <LoadingSpinner/>
}
  return (
    <div>
        <Navbar/>
        <ShopPageBanner data={getShopDetails.data}/>
        <ShopFishesSection data={getShopDetails.data}/>
        <Footer/>
    </div>
  )
}
