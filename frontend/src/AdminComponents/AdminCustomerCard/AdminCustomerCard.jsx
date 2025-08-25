import React from 'react'
import "./AdminCustomerCard.css"
import avatar from "../../assets/images/avatar.jpg"
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateVerifyCustomer } from '../../api/Admin'
import { LoadingSpinner } from '../../CustomerComponents/LoadingSpinner/LoadingSpinner'
export const AdminCustomerCard = ({id,name,email,phone,verified,refetch}) => {

const adminToken = localStorage.getItem("adminToken")
    
      const {mutate,isPending,isSuccess,isError,error} = useMutation({
        mutationFn:updateVerifyCustomer,
        onSuccess:(data)=>{
        data.user.verified ? toast.success("Enabled"):toast.error("Disabled")
      refetch()
    
        },
        onError:(err)=>{
          toast.error(err.message)
         
        }
    })

    const handleUpdate = (id,verified)=>{
        mutate({userId:id,adminToken,verified})
    }

if(isPending){
    return <LoadingSpinner/>
}

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
    <button onClick={()=>handleUpdate(id,verified)}>{verified ? "Disable" : "Enable"}</button>
</div>
    </div>
  )
}
