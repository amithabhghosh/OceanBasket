import React from 'react'
import "./FishCard.css"
import { useNavigate } from 'react-router-dom'
export const FishCard = ({image,name,price,id}) => {
  const navigate = useNavigate()
  return (
    <div className='FishCard' onClick={()=>navigate(`/fish/${id}`)}>
        <div className="fishCardImage">
            <img src={image} alt="" />
        </div>
        <div className="fishCardDownSection">
          <p>{name}</p>
          <p className='fishCardPrice'>₹{price/2} <span>/500g</span></p>
        </div>
    </div>
  )
}
