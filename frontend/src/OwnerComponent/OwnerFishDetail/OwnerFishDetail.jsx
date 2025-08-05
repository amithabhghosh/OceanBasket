import React from 'react'
import "./OwnerFishDetail.css"
import { useParams } from 'react-router-dom'
export const OwnerFishDetail = ({data,isLoading,isError}) => {
    const fishDetail = data?.fishDetails
  return (
    <>
    <div className="fish-details-container">
       <div className="fish-details-backbutton">
        <ion-icon name="arrow-back-circle-outline"></ion-icon>
        <p>Back</p>
       </div>
       <div className="fish-details-items">
        <div className="fish-details-image">
            <img src={fishDetail?.image} alt="fishimage"/>
        </div>
        <div className='fish-details-detail'>
          <div className='fish-details-fishname'>
            <h3>{fishDetail?.name} </h3>
             <span>Curry cut</span>    
             </div>
          <div className='fish-details-price'>
            <p>₹{fishDetail?.pricePerKg/2} /</p> <span>500g</span>
          </div>
          
          <p>{fishDetail?.description}</p>
          <div className='fish-details-button'>
            <button>Edit Details</button>
          </div>
          
        </div>
       </div>
       </div>
    </>
  )
}
