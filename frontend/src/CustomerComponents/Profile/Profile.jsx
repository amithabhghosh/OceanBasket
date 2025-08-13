import React, { useContext, useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import "./Profile.css"
import { addAddress, deleteAddress, getProfile, updateProfile } from '../../api/auth';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ContextAPI } from '../../Context/ContextAPI';
export const Profile = () => {
  const navigate = useNavigate();
    const {zipCode,setZipCode} = useContext(ContextAPI)
    const [isProfileEdit,setIsProfileEdit] = useState(false)
const [isEditAddress,setIsEditAddress] = useState(false)
const [isAddAddress,setIsAddAddress] = useState(false)
const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [alternativeNumber,setAlternativeNumber] = useState("")
const [addressLine1,setAddressline1] = useState("")
const [addressLine2,setAddressline2] = useState("")
const [pinCode,setPinCode] = useState("")
const [landmark,setLandmark] = useState("") 
const [city,setCity] = useState("")




     const token = localStorage.getItem("userToken");
const {
        data,
        isLoading,
        isError,
   refetch
      } = useQuery({
        queryKey: ['getProfile'],
        queryFn: () => getProfile({token}),
        keepPreviousData: true,
      });


const updateProfileMutation = useMutation({
    mutationFn: (profileData) => updateProfile({...profileData,token}),
    onSuccess: (data) => {
        refetch()
        setIsProfileEdit(false)
      toast.success("Profile Updated")
        
    },
    onError: (err) => {
      const message = err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
    },
  });

const updateAddressMutation = useMutation({
    mutationFn: (addressData) => updateProfile({...addressData,token}),
    onSuccess: (data) => {
        refetch()
        setIsEditAddress(false)
      toast.success("Address Updated")
  setZipCode(pinCode)
      localStorage.setItem("zipCode",pinCode)
       setAddressline1("");
    setAddressline2("");
    setLandmark("");
    setPinCode("");
    setCity("");
    },
    onError: (err) => {
      const message = err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
    },
  });

  const addAddressMutation = useMutation({
    mutationFn: (addressData) => addAddress({...addressData,token}),
    onSuccess: (data) => {
        refetch()
        setIsAddAddress(false)
      toast.success("Address Added")
    setZipCode(pinCode)
      localStorage.setItem("zipCode",pinCode)
        setAddressline1("");
    setAddressline2("");
    setLandmark("");
    setPinCode("");
    setCity("");
    },
    onError: (err) => {
      const message = err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
    },
  });

    const deleteAddressMutation = useMutation({
    mutationFn: () => deleteAddress({token}),
    onSuccess: (data) => {
        refetch()
      toast.success("Address Deleted")
    
      localStorage.removeItem("zipCode")
        setAddressline1("");
    setAddressline2("");
    setLandmark("");
    setPinCode("");
    setCity("");
    
    },
    onError: (err) => {
      const message = err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
    },
  });

const handleUpdateProfile = ()=>{
updateProfileMutation.mutate({
      name,
      email,
      alternativeNumber
    });
}

const handleAddNewAddress = ()=>{
    if(!addressLine1.trim() || !addressLine2.trim() || !city.trim() || !pinCode.trim() || !landmark.trim()){
        return toast.error("The Fields are Required")
    }
addAddressMutation.mutate({
      addressLine1,
      addressLine2,
      city,
      zipCode:pinCode,
      landmark
    });
}

const handleUpdateAddress = ()=>{
    if(!addressLine1.trim() || !addressLine2.trim() || !city.trim() || !pinCode.trim() || !landmark.trim()){
        return toast.error("The Fields are Required")
    }
updateAddressMutation.mutate({
      addressLine1,
      addressLine2,
      city,
      zipCode:pinCode,
      landmark
    });
}


const handleDeleteAddress = ()=>{
deleteAddressMutation.mutate()
}
useEffect(()=>{
  const user = data?.user
  if(user){
setName(user.name)
setEmail(user.email)
setAlternativeNumber(user.alternativeNumber)
  }
})

useEffect(() => {
  const addr = data?.user?.address?.[0];
  if (addr) {
    setAddressline1(addr.addressLine1 || "");
    setAddressline2(addr.addressLine2 || "");
    setLandmark(addr.landmark || "");
    setPinCode(addr.zipCode || "");
    setCity(addr.city || "");
    
  }
}, [data]);
      console.log(data)
    if(isLoading)return <LoadingSpinner/>
    if (isError){
      return navigate("/")
    }
    
  return (
    <div className='Profile'>
<div className="profileTop" >
     <p onClick={() => navigate(-1)}><ion-icon name="arrow-back-outline" ></ion-icon> Back</p>
</div>
<div className="profileMainSection">
    <div className="profilePersonalPortion">
<h2>Your Profile</h2>
<div className="profilePersonalInfo">
    <p>{data?.user?.name}</p>
    <p>{data?.user?.email}</p>
    <p>{data?.user?.phone}</p>
    <p>{data?.user?.alternativeNumber}</p>
</div>
<div className="profilePersonalButton">
    <button onClick={()=>setIsProfileEdit((prev)=>!prev)}>Edit Personal Info</button>
</div>
{isProfileEdit? (
<div className="profileInfoEditSection">
    <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)} value={name}/>
    <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} />
    <input type="tel" placeholder='Alternate Phone Number'onChange={(e)=>setAlternativeNumber(e.target.value)} value={alternativeNumber} />
    <button onClick={handleUpdateProfile}>Update Profile</button>
</div>
):null}

    </div>
    <div className="profileAddressSection">
<div className="addressSectionTop">
    <p>Current Address</p>
</div>
<div className={`profileAddressList ${
    data?.user?.address.length > 0 ? 'alignBottom' : ''
  }`}>
    {data?.user?.address.length > 0 ? (
data.user.address.map((address)=>(
    <div className='addressOne'>
        <div className='addressNumberOne'>
<p>{address.addressLine1}</p>
<p>{address.addressLine2}</p>
<p>{address.landmark}</p>
<p>{address.state}</p>
<p>{address.city}</p>
<p>{address.zipCode}</p>
        </div>

<div className='addressOneButtons'>
    <button onClick={()=>setIsEditAddress((prev)=>!prev)}>Edit Address</button>
    <ion-icon name="trash-outline" onClick={handleDeleteAddress} ></ion-icon>
</div>
    </div>
))
    ):(
    <div>
<button onClick={()=>setIsAddAddress((prev)=>!prev)}>Add New</button>
    </div>
    )}
</div>

{(isEditAddress || isAddAddress) && (
  <div className='editAddress'>
    <input type="text" placeholder='Address Line 1' onChange={(e)=>setAddressline1(e.target.value)} value={addressLine1}/>
    <input type="text" placeholder='Address Line 2' onChange={(e)=>setAddressline2(e.target.value)} value={addressLine2} />
    <input type="text" placeholder='Landmark' onChange={(e)=>setLandmark(e.target.value)} value={landmark}/>
    <input type="text" placeholder='Zip Code' onChange={(e)=>setPinCode(e.target.value)} value={pinCode}/>
    <input type="text" placeholder='City' onChange={(e)=>setCity(e.target.value)} value={city}/>
    <button onClick={()=>isEditAddress ? handleUpdateAddress() : handleAddNewAddress()}>{isEditAddress?"Edit Address":"Add Address"}</button>
  </div>
)}




    </div>
</div>
    </div>
  )
}
