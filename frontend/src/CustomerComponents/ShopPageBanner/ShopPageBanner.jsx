import React, { useContext } from 'react'
import "./ShopPageBanner.css"
import { useNavigate, useParams } from 'react-router-dom'
import { ContextAPI } from '../../Context/ContextAPI'
import { getShopByShopId } from '../../api/auth'
import { useQuery } from '@tanstack/react-query';
export const ShopPageBanner = ({data}) => {
  const navigate = useNavigate()
   
  

console.log(data)
  return (
    <div className='ShopPageBanner'>
        <div className="shopBannerTopSection">
            
            <p onClick={() => navigate(-1)}><ion-icon name="arrow-back-outline" ></ion-icon> Back</p>
        </div>
        <div className="shopBannerImageSection">
          <div className="shopBannerDetailsSections">

   <img src={data.owner.shopImage} alt="" />
            <ion-icon name="storefront-outline" className="shopBannerIcon"></ion-icon>
          </div>
           <div className="shopBannerDetails">
            <p>Shop Name : {data.owner.shopName}</p>
            <p>City : {data.owner.city}</p>
            <p>Shop Open Time : {data.owner.shopOpenTime}</p>
            <p>Shop Close Time : {data.owner.shopCloseTime}</p>
           </div>
        </div>
    </div>
  )
}
