import React from 'react'
import "./AdminCustomerCard.css"
import avatar from "../../assets/images/avatar.jpg"
export const AdminCustomerCard = ({name,email,phone,verified}) => {
  return (
    <div className='AdminCustomerCard'>
<div className="adminCustomerImage">
    <img src={avatar} alt="" />
</div>
<div className="adminCustomerDetails">
    <div className="adminCustomerDetailName">
        <p>Name:{name}</p>
    </div>
    <div className="adminCustomerDetailA">
        <p>Email:{email}</p>
    </div>
    <div className="adminCustomerDetailPhone">
        <p>Phone:{phone}</p>
    </div>
</div>
<div className="adminCustomerActivateButton">
    <button>{verified ? "Disable" : "Enable"}</button>
</div>
    </div>
  )
}
