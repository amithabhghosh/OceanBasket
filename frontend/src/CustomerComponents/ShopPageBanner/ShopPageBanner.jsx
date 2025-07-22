import React from 'react'
import "./ShopPageBanner"
import { useParams } from 'react-router-dom'
export const ShopPageBanner = () => {
    const {ownerId} = useParams()
    console.log(ownerId)
  return (
    <div className='ShopPageBanner'>
        <div className="shopBannerTopSection">
            
            <p><ion-icon name="arrow-back-outline"></ion-icon> Back</p>
        </div>
        <div className="shopBannerImageSection">
            <img src="" alt="" />
        </div>
    </div>
  )
}
