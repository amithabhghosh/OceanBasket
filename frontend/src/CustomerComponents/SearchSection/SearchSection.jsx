import React from 'react'
import "./SearchSection.css"
import { ShopCard } from '../ShopCard/ShopCard'
import EmptySection from '../EmptySection/EmptySection';
export const SearchSection = ({data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch,showAll,setShowAll ,isLoading}) => {
const shops = data?.shops || []; // safely extract
  console.log("Shops:", shops);

if(shops.length == 0){
  return <EmptySection/>
}  
  return (
    <div className='SearchSection'>
<div className="searchSectionList">
    {data?.shops?.map((shop)=>(
        <ShopCard key={shop._id} id={shop._id} shopName={shop.shopName} delivery={shop.deliveryRadiusInKm} image={shop.shopImage} />
    ))}
</div>
    </div>
  )
}
