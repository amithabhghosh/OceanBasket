import React from 'react'
import "./ShopCardRelated.css"
import { useNavigate } from 'react-router-dom'
export const ShopCardRelated = ({shopName,delivery,id,image,fishOwnerId}) => {
  
    const navigate = useNavigate()
  return (
    <div className="shopCardRelated" onClick={()=>navigate(`/fish/${fishOwnerId}`)}>
      <div className="shopCardImageSectionRelated">
        <ion-icon name="storefront-outline" className="shopIconRelated"></ion-icon>
        <img src={image} alt="shop" />
      </div>

      <div className="shopCardDetailsRelated">
        <div className="shopCardTextInfoRelated">
          <h3>{shopName}</h3>
          <p>Ernakulam</p>
        </div>

        <div className="shopCardDeliveryRelated">
          <div className="deliveryTopRelated">
            <ion-icon name="location-outline"></ion-icon>
            <h4>{delivery} km</h4>
          </div>
          <p className="deliveryNoteRelated">Delivery Available</p>
        </div>
      </div>
    </div>
  )
}
