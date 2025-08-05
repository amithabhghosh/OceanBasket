import React from 'react'
import "./OwnerCard.css"

import { useNavigate } from 'react-router-dom'
export const OwnerCard = ({image,id,name,price}) => {
const navigate = useNavigate()
  return (
    <div className="owner-card" onClick={()=>navigate(`/owner/fish/${id}`)}>
        <div className="owner-card-image">
          <img src={image} alt="fishes-image" />
        </div>
        <div className="owner-card-price">
          <p>{name}</p>
          <p>₹{price/2} <span>/500g</span></p>
        </div>
      </div>
  )
}
