import React from 'react'
import "./AdminOwnerCard.css"
import avatar from "../../assets/images/avatar.jpg"
export const AdminOwnerCard = ({id,shopName,ownerName,image,email,phone,verified}) => {
  return (
    <div className='AdminOwnerCard'>
<div className="adminOwnerImage">
    <img src={image} alt="" />
</div>
<div className="adminOwnerDetails">
    <div className="adminOwnerNameDetails">
        <p>Owner Name : {ownerName}</p>
    </div>
     <div className="adminOwnerShopName">
        <p>Shop Name : {shopName}</p>
    </div>
     <div className="adminOwnerPhone">
        <p>Phone : {phone}</p>
    </div>
     <div className="adminOwnerEmail">
        <p>Email : {email}</p>
    </div>
    <div className="adminOwnerButton">
    <button>{verified?"Disable":"Enable"}</button>
</div>
</div>

    </div>
  )
}
