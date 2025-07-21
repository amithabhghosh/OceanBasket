import React from 'react'
import "./ShopCard.css"
import FishStore from "../../assets/images/FishStore.webp"
export const ShopCard = ({shopName,delivery,id}) => {
  return (
 <div className="shopCard">
      <div className="shopCardImageSection">
        <ion-icon name="storefront-outline" className="shopIcon"></ion-icon>
        <img src={FishStore} alt="shop" />
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
