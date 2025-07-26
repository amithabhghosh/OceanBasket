import React from 'react'
import "./ShopCardRelated.css"
import { useNavigate } from 'react-router-dom'
export const ShopCardRelated = ({shopName,delivery,id,image,fishOwnerId}) => {
  
    const navigate = useNavigate()
  return (
    <div className="shopCard" onClick={()=>navigate(`/fish/${fishOwnerId}`)}>
      <div className="shopCardImageSection">
        <ion-icon name="storefront-outline" className="shopIcon"></ion-icon>
        <img src={image} alt="shop" />
      </div>

      <div className="shopCardDetails">
        <div className="shopCardTextInfo">
          <h3>{shopName}</h3>
          <p>Ernakulam</p>
        </div>

        <div className="shopCardDelivery">
          <div className="deliveryTop">
            <ion-icon name="location-outline"></ion-icon>
            <h4>{delivery} km</h4>
          </div>
          <p className="deliveryNote">Delivery Available</p>
        </div>
      </div>
    </div>
  )
}
