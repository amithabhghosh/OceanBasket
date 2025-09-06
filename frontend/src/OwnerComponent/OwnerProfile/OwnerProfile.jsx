import React from 'react'
import "./OwnerProfile.css"
import background from  "../../assets/images/background.jpg"
import profile from "../../assets/images/Profile.jpg"
import { useMutation } from '@tanstack/react-query'
import { locationUpdating } from '../../api/owner'
import { toast } from 'react-toastify'
export const OwnerProfile = ({data,refetch}) => {
  const owner = data?.owner || []
const ownerToken = localStorage.getItem("ownerToken")

const {mutate,isPending,isSuccess,isError,error} = useMutation({
    mutationFn:locationUpdating,
    onSuccess:(data)=>{
 
 
toast.success("Location Updated")
refetch()
    },
    onError:(err)=>{
        const errorMessage =
           err.response?.data?.message || 
           err.message ||                 
           "Something went wrong";        
       
         toast.error(errorMessage);
         console.log(errorMessage);
    }
})


const handleSetLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        mutate({ lat, lng, ownerToken });
      },
      (err) => {
        console.error("Geolocation error:", err);
        toast.error("Failed to get location");
      },
      { enableHighAccuracy: true }
    );
  } else {
    toast.error("Geolocation not supported by this browser");
  }
};


  return (
   <div className='ownerProfile'>
 <div className="ownerProfileBackButton">  
        <p> <ion-icon name="arrow-back-circle-outline"></ion-icon> Back</p>
       </div>    
<div className="ownerProfileDetailsSection">
  <div className="ownerProfileImageSection">
    <img src={owner.shopImage} alt="" />
      {owner?.location?.coordinates &&
   (owner.location.coordinates[0] === 0 &&
    owner.location.coordinates[1] === 0) ? (
      <button onClick={handleSetLocation} className='setLocationBtn'>Set Current Location</button>
    ) : null}
  </div>
<div className="ownerProfileRightSection">
  <div className="ownerProfileNamesAndDetails">
    <p>Shop Name : <span>{owner.shopName}</span></p>
    <p>Shop Owner Name: <span>{owner.ownerName}</span></p>
    <p>Address Line1 : <span>{owner.addressLine1}</span></p>
    <p>Address Line2 : <span>{owner.addressLine2}</span></p>
    <p>Zipcode  : <span>{owner.zipCode}</span></p>
    <p>City : <span>{owner.city}</span></p>
    <p>State : <span>{owner.state}</span></p>
    <p>Shop Open Time : <span>{owner.shopOpenTime}</span></p>
    <p>Shop Closing Time : <span>{owner.shopCloseTime}</span></p>
  </div>
</div>
</div>
   </div>
  )
}
