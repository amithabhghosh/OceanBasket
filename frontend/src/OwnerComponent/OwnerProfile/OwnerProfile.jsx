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
    <section className='ownerProfileMainSection'>
      <div className='ownerProfileDetailsMainSection'>
        <div className='ownerProfileBackgroundAndProfileImageSection' style={{backgroundImage: `url(${owner?.shopImage})`}}>
          <img className='ownerProfileImage' src={profile} alt="Profile Image Of Owner"/>
        </div>
        <div className="ownerProfileDetailsSection">
          <div className='ownerProfileNameAndAddressSection'>
            <h2 className='ownerProfileName'>{owner?.shopName}</h2>
            <p className='ownerProfileAddress'>{owner?.addressLine1},{owner?.addressLine2}</p>
          {owner?.location?.coordinates &&
   (owner.location.coordinates[0] === 0 &&
    owner.location.coordinates[1] === 0) ? (
      <button onClick={handleSetLocation} className='setLocationBtn'>Set Current Location</button>
    ) : null}
          </div>
          <div className='ownerProfileShopDetailsSection'>
            <h3 className='ownerProfileShopDetailsHeading'>Shop Details</h3>
            <div className='ownerShopOwnerSection'>
              <p className='ownerShopOwnerText'>Shop Owner</p>
              <h3 className='ownerShopOwnerName'>{owner?.ownerName}</h3>
            </div>
            <div className='ownerShopNameSection'>
              <p className='ownerShopNameText'>Shop Name</p>
              <h3 className='ownerShopName'>{owner?.shopName}</h3>
            </div>
            <div className='ownerShopAddressSection'>
              <p className='ownerShopAddressText'>Shop Address</p>
              <h3 className='ownerShopAddress'>{owner?.addressLine1},{owner?.addressLine2}</h3>
            </div>
            <div className="ownerShopLiscenseNumberSection">
              <p className='ownerShopLicenseNumberText'>Pincode</p>
              <h3 className='ownerShopLicenseNumber'>{owner?.zipCode}</h3>
            </div>
            <div className="ownerShopDetailsToBeAddedSection1">
              <p className='ownerShopDetailsToBeAddedSection1Text'>City</p>
              <h3 className='ownerShopDetailsToBeAddedSection1Details'>{owner?.city}</h3>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  )
}
