import React from 'react'
import "./AdminOwner.css"
import { AdminOwnerCard } from '../AdminOwnerCard/AdminOwnerCard'
import { useNavigate } from 'react-router-dom'
import EmptySection from '../../CustomerComponents/EmptySection/EmptySection'
export const AdminOwner = ({data,refetch}) => {
  const navigate = useNavigate()
if(data.owners.length == 0){
  return <EmptySection message={"No Owners"}/>
}
  return (
    <div className='AdminOwner'>
<div className="adminOwnerHeading">
    <h2>Owners</h2>
</div>
<div className="adminAddOwnerButton">
  <button onClick={()=>navigate("/admin/addOwner")} >Add Owner</button>
</div>
{!data.owners ? <p>No Owners</p> : (
<div className="adminOwnersLists">
    {data.owners.map((owner)=>(
  <AdminOwnerCard  refetch={refetch} id={owner._id} ownerName={owner.ownerName} email={owner.email} phone={owner.phone} image= {owner.shopImage} shopName={owner.shopName} verified={owner.verified}/>
    ))}
  
</div>
)}

    </div>
  )
}
