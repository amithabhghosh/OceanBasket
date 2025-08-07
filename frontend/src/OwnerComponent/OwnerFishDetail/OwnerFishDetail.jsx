import React, { useState } from 'react'
import "./OwnerFishDetail.css"
import { useParams } from 'react-router-dom'
export const OwnerFishDetail = ({data,isLoading,isError}) => {
  const [isEdit,setIsEdit] = useState(false)
    const fishDetail = data?.fishDetails
  return (
    <>
    <div className="fish-details-container">
       <div className="fish-details-backbutton">
        
        <p> <ion-icon name="arrow-back-circle-outline"></ion-icon> Back</p>
       </div>
       <div className="fish-details-items">
        <div className="fish-details-image">
            <img src={fishDetail?.image} alt="fishimage"/>
        </div>
        <div className='fish-details-detail'>
          <div className='fish-details-fishname'>
            <h3>{fishDetail?.name} </h3>
             
             </div>
                <span>Type : Medium</span> 
          <div className='fish-details-price'>
            <p>₹{fishDetail?.pricePerKg/2} /<span>500g</span></p>
            
          </div>
          <p className='OwnerFishDetailQuantity'>Quantity Balance: <span>{fishDetail?.availableQuantityKg}</span>Kg</p>
          <p className='ownerFishDetailsDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatibus quae explicabo veniam officia repellendus consectetur laboriosam, atque maiores sint?</p>
          <div className='fish-details-button'>
            <button onClick={()=>setIsEdit((prev)=>!prev)}>Edit Details</button>
          </div>
          
        </div>
       </div>
{isEdit ? (
<>
<div className="OwnerFishQuantityEditSection">
  <input type="number" placeholder='Extra Quantity'/>
  <button>Add</button>
</div>
</>
):(null)}
       </div>
    </>
  )
}
