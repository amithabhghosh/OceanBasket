import React from 'react'
import "./AdminOwnerCard.css"
import avatar from "../../assets/images/avatar.jpg"
import { LoadingSpinner } from '../../CustomerComponents/LoadingSpinner/LoadingSpinner'
import { useMutation } from '@tanstack/react-query'
import { updateVerifyOwner } from '../../api/Admin'
import { toast } from 'react-toastify'
export const AdminOwnerCard = ({id,shopName,ownerName,image,email,phone,verified,refetch}) => {

    const adminToken = localStorage.getItem("adminToken")
        
          const {mutate,isPending,isSuccess,isError,error} = useMutation({
            mutationFn:updateVerifyOwner,
            onSuccess:(data)=>{
            data.owner.verified ? toast.success("Owner Enabled"):toast.error("Owner Disabled")
          refetch()
        
            },
            onError:(err)=>{
              toast.error(err.message)
             
            }
        })
    
        const handleUpdate = (id,verified)=>{
            mutate({ownerId:id,adminToken,verified})
        }
    
    if(isPending){
        return <LoadingSpinner/>
    }

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
    <button onClick={()=>handleUpdate(id,verified)}>{verified?"Disable":"Enable"}</button>
</div>
</div>

    </div>
  )
}
