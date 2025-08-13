import React, { useContext, useEffect, useState } from 'react'
import "./ShopFishesSection.css"
import { ContextAPI } from '../../Context/ContextAPI'
import { getShopByShopId, getTimeOfClosing } from '../../api/auth'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { FishCard } from '../FishCard/FishCard'
export const ShopFishesSection = () => {
  const [available,setAvailable] = useState()
        const {zipCode,setZipCode} = useContext(ContextAPI)
        const {ownerId} = useParams()
        console.log(ownerId)
          const {
        data,
        isLoading,
        isError,
        refetch,
      } = useQuery({
        queryKey: ['getShopById', zipCode,ownerId],
        queryFn: () => getShopByShopId({ ownerId}),
        keepPreviousData: true,
      });
    
const checkStatus = async () => {
  try {
    const res = await getTimeOfClosing({shopId:ownerId});
    setAvailable(res.isBlocked);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
  if (ownerId) {
    checkStatus();
    const interval = setInterval(checkStatus, 1000); 
    return () => clearInterval(interval);
  }
}, [ownerId]);

      
      if (isLoading) return <p className='loadingError'>Loading...</p>;
      if (isError || data?.success === false) return <p >{data?.message || "Error fetching fishes"}</p>;
      const fishList = data?.fishes || []
  return (
    <div className='ShopFishesSection'>
<div className="shopFishesTopSection">
    <div className="shopFishesSectionNamees">
        <h3>{data.owner.shopName}</h3>
        <h4>{data.owner.city?data.owner.city:"Ernakulam"}</h4>
    </div>
    <div className="shopFishesSectionNavigations">
        <h4><ion-icon name="location-outline"></ion-icon> {data.owner.deliveryRadiusInKm} Km </h4>
        <span>{available ? "Currently Not Accepting Orders" : "Delivery Available"}</span>
    </div>
</div>
<div className="ShopFishesDownSection">
{fishList.map((item)=>(
    <FishCard image={item.image} name={item.name} price={item.pricePerKg} id={item._id}/>
))}
</div>
    </div>
  )
}
