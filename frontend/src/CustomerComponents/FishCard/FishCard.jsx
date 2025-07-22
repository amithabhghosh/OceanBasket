import React from 'react'
import "./FishCard.css"
export const FishCard = ({image,name,price,id}) => {
  return (
    <div className='FishCard'>
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
