import React from 'react'
import "./AdminOwner.css"
import { AdminOwnerCard } from '../AdminOwnerCard/AdminOwnerCard'
import { useNavigate } from 'react-router-dom'
export const AdminOwner = ({data}) => {
  const navigate = useNavigate()
  return (
    <div className='AdminOwner'>
<div className="adminOwnerHeading">
    <h2>Owners</h2>
</div>
<div className="adminAddOwnerButton">
  <button onClick={()=>navigate("/admin/adminOwner")} >Add Owner</button>
</div>
<div className="adminOwnersLists">
    {data.owners.map((owner)=>(
  <AdminOwnerCard id={owner._id} ownerName={owner.ownerName} email={owner.email} phone={owner.phone} image= {owner.shopImage} shopName={owner.shopName} verified={owner.verified}/>
    ))}
  
</div>
    </div>
  )
}
