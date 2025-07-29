import React, { useContext } from 'react'
import "./ShopPageBanner.css"
import { useNavigate, useParams } from 'react-router-dom'
import { ContextAPI } from '../../Context/ContextAPI'
import { getShopByShopId } from '../../api/auth'
import { useQuery } from '@tanstack/react-query';
export const ShopPageBanner = () => {
  const navigate = useNavigate()
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

  
  if (isLoading) return <p className='loadingError'>Loading...</p>;
  if (isError || data?.success === false) return <p>{data?.message || "Error fetching fishes"}</p>;
console.log(data)
  return (
    <div className='ShopPageBanner'>
        <div className="shopBannerTopSection">
            
            <p onClick={() => navigate(-1)}><ion-icon name="arrow-back-outline" ></ion-icon> Back</p>
        </div>
        <div className="shopBannerImageSection">
            <img src={data.owner.shopImage} alt="" />
            <ion-icon name="storefront-outline" className="shopBannerIcon"></ion-icon>
        </div>
    </div>
  )
}
