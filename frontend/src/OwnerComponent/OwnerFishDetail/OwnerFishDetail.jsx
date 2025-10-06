import React, { useEffect, useState } from 'react'
import "./OwnerFishDetail.css"
import { useNavigate, useParams } from 'react-router-dom'
import { getEditTime, updateQuantity } from '../../api/owner'
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
export const OwnerFishDetail = ({data,isLoading,isError,refetch}) => {
  const [isEdit,setIsEdit] = useState(false)
    const fishDetail = data?.fishDetails
const [edit,setEdit] = useState(false)
const {fishId} = useParams()
const navigate = useNavigate()
const ownerToken = localStorage.getItem("ownerToken")
const [quantity,setQuantity] = useState(0)
   const checkStatus = async () => {
     try {
       const res = await getEditTime();
     setEdit(res.isBlocked)
     } catch (error) {
       console.error(error);
     }
   };
   
     useEffect(() => {
     if (fishDetail?.owner) {
       checkStatus();
       const interval = setInterval(checkStatus, 1000); 
       return () => clearInterval(interval);
     }
   }, [fishDetail?.owner]);

const updateQuantityOwner = useMutation({
  mutationFn: ({ ownerToken, fishId, quantity }) => 
    updateQuantity({ ownerToken, fishId, quantity }), // Pass all params
  onSuccess: () => {
    toast.success("Quantity Updated");
    setQuantity(0)
    refetch();
    
  },
  onError: (err) => {
    const message = err?.response?.data?.message || err.message || "Something went wrong";
    toast.error(message);
  },
});

const handleUpdateQuantity = async () => {
  if(quantity<=0){
    return toast.error("Min Quantity is 1 Kg")
  }
  updateQuantityOwner.mutate({ ownerToken, quantity, fishId }); // Pass from here
};

  return (
    <>
    <div className="fish-details-container">
       <div className="fish-details-backbutton">
        
        <p onClick={() => navigate(-1)}> <ion-icon name="arrow-back-circle-outline"></ion-icon> Back</p>
       </div>
       <div className="fish-details-items">
        <div className="fish-details-image">
            <img src={fishDetail?.image} alt="fishimage"/>
        </div>
        <div className='fish-details-detail'>
          <div className='fish-details-fishname'>
            <h3>{fishDetail?.name} </h3>
             
             </div>
                <span>Type:{fishDetail?.type}</span> 
          <div className='fish-details-price'>
            <p>₹{fishDetail?.pricePerKg/2} /<span>500g</span></p>
            
          </div>
          <p className='OwnerFishDetailQuantity'>Quantity Balance: <span>{fishDetail?.availableQuantityKg}</span>Kg</p>
         
          <div className='fish-details-button'>
            <button onClick={()=>setIsEdit((prev)=>!prev)} disabled={!edit}>Edit Details</button>
          </div>
          
        </div>
       </div>
{isEdit ? (
<>
<div className="OwnerFishQuantityEditSection">
  <input type="number" placeholder='Extra Quantity' onChange={(e)=>setQuantity(e.target.value)} value={quantity}/>
  <button onClick={handleUpdateQuantity}>Add</button>
</div>
</>
):(null)}

  <p className='ownerFishDetailsDescription'>{fishDetail?.description}</p>
       </div>

      
    </>
  )
}
