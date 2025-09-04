import React, { useContext, useEffect, useState } from 'react'
import "./ShopFishesSection.css"
import { ContextAPI } from '../../Context/ContextAPI'
import { getShopByShopId, getTimeOfClosing } from '../../api/auth'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { FishCard } from '../FishCard/FishCard'
import EmptySection from '../EmptySection/EmptySection'
export const ShopFishesSection = ({data}) => {
  const [available,setAvailable] = useState()
   
        const {ownerId} = useParams()
        
    
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
{data.fishes.length == 0 ? (
<EmptySection message={"No Fishes In The Shop"}/>
) : (
<div className="ShopFishesDownSection">
{fishList.map((item)=>(
    <FishCard image={item.image} name={item.name} price={item.pricePerKg} id={item._id}/>
))}
</div>
)}

    </div>
  )
}
