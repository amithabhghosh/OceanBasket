import React from 'react'
import "./AdminFishCard.css"
import cat from "../../assets/images/cat1.jpg"
export const AdminFishCard = ({id,price,quantity,ownerId,shopName,image,name}) => {
  return (
    <div className='AdminFishCard'>
<div className="adminFishCardImage">
    <img src={image} alt="" />
</div>
<div className="adminFishCardDetails">
    <p className='adminFishCardDetailName'>{name}</p>
    <p>{shopName}</p>
    <p><span>₹{price}</span>/500g</p>
    <p>{quantity}Kg Available</p>
</div>
    </div>
  )
}
