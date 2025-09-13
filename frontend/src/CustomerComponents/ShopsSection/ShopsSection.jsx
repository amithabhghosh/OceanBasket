import React, { useContext, useEffect, useRef, useState } from 'react'
import "./ShopsSection.css"
import { useInfiniteQuery } from '@tanstack/react-query';
import { getShopsByPincode } from '../../api/auth';
import { ShopCard } from '../ShopCard/ShopCard';
import { ContextAPI } from '../../Context/ContextAPI';
import EmptySection from '../EmptySection/EmptySection';
export const ShopsSection = ({ data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch,showAll,setShowAll ,isLoading}) => {
const {zipCode,setZipCode} = useContext(ContextAPI)
console.log(data?.pages[0]?.shops)

  // const limit = showAll ? 10 : 3;
// const {data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     refetch,} = useInfiniteQuery({
//    queryKey: ['shops',zipCode, showAll],
//     queryFn: ({ pageParam = 0 }) => getShopsByPincode({ pageParam, limit, zipCode }),
//     getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
//     enabled: !!zipCode,
// })


const loadMoreRef = useRef();


 useEffect(() => {
    if (!showAll || !hasNextPage) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    }, {
      threshold: 1,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [loadMoreRef.current, hasNextPage, showAll]);

// if(!data?.pages[0]?.shops){
//   return <EmptySection message={"No Shops"}/>
// }
  
  return (
    <div className='ShopsSection'>
<div className="shopsSectionTexts">
    <p>Shops nearby</p>
    {!showAll &&  (
        <p onClick={() => setShowAll(true)} className="see-all-button">
          See All<ion-icon name="arrow-forward-outline"></ion-icon>
        </p>
      )}
</div>
<div className="shopSectionShopsList">
  {!isLoading && data?.pages?.flatMap(page =>
    page?.shops?.map(shop => (
        <>
      <ShopCard key={shop._id} id={shop._id} shopName={shop.shopName} delivery={shop.deliveryRadiusInKm} image={shop.shopImage} city={shop.city}/>
       
      </>
    ))
  )}
   {!showAll && (
        <p onClick={() => setShowAll(true)} className="see-all-button-smallScreen">
          See All<ion-icon name="arrow-forward-outline"></ion-icon>
        </p>
      )}
</div>

{showAll && (
  <div ref={loadMoreRef} style={{ padding: "1rem", textAlign: "center" }}>
    {isFetchingNextPage ? (
      <div className="spinner" />
    ) : hasNextPage ? (
      <p>Scroll down to load more</p>
    ) : (
      <p>No more shops</p>
    )}
  </div>
)}

    </div>
  )
}
