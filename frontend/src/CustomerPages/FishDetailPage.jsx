import React, { useState } from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { FishDetails } from '../CustomerComponents/FishDetails/FishDetails'
import { Footer } from '../CustomerComponents/Footer/Footer'
import { useQuery } from '@tanstack/react-query'
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'
import { useParams } from 'react-router-dom'
import { getFishByFishId, getShopsByFishId } from '../api/auth'

export const FishDetailPage = () => {
    const {fishId} = useParams()
  const [switchShop,setSwitchShop] = useState(false)
  const lat = localStorage.getItem("lat")
  const lng = localStorage.getItem("lng")
   const fishDatas= useQuery({
          queryKey: ['fishesByFishId',lat,lng,fishId],
          queryFn: () => getFishByFishId({fishId}),
          keepPreviousData: true,
        });
  
     const shopDatas = useQuery({
          queryKey: ['shopsByFishId', lat,lng,fishId],
          queryFn: () => getShopsByFishId({fishId,lat,lng}),
          keepPreviousData: true,
          enabled: switchShop
        });
  
if(fishDatas.isLoading){
  return <LoadingSpinner/>
}

  return (
    <div>
        <Navbar/>
        <FishDetails shopData={shopDatas.data} fishData={fishDatas.data} switchShop={switchShop} setSwitchShop={setSwitchShop}/>
        <Footer/>
    </div>
  )
}
