import React, { useState } from 'react'
import "./AdminAddOwner.css"
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { registerOwner } from '../../api/Admin'
import { toast } from 'react-toastify'
export const AdminAddOwner = () => {
const navigate = useNavigate()
const [ownerName,setOwnerName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [phone,setPhone] = useState("")
const [shopName,setShopName] = useState("")
const [zipCode,setZipCode] = useState("")
const [addressLine1,setAddressLine1] = useState("")
const [addressLine2,setAddressLine2] = useState("")
const [city,setCity] = useState("")
const [selectedState,setSelectedState] = useState("")
const [shopOpenTime,setShopOpenTime] = useState("")
const [shopCloseTime,setShopClosingTime] = useState("")
const [deliveryRadiusInKm,setDeliveryRadiusInKm] = useState(0)

const adminToken = localStorage.getItem("adminToken")
  const {mutate,isPending,isSuccess,isError,error} = useMutation({
    mutationFn:registerOwner,
    onSuccess:(data)=>{
    toast.success("Owner Registration Success")
    navigate("/admin/owner")

    },
    onError:(err)=>{
      toast.error(err.message)
     
    }
})



const handleAddOwner  = (e)=>{
e.preventDefault()

const fields = {
  ownerName,
  email,
  password,
  phone,
  shopName,
  zipCode,
  addressLine1,
  addressLine2,
  city,
  selectedState,
  shopOpenTime,
  shopCloseTime,
  deliveryRadiusInKm
};

// validate
for (const [key, value] of Object.entries(fields)) {
  if (!value || String(value).trim() === "") {
    return toast.error(`${key} is required`);
  }
}


  mutate({
    ownerName,email,password,phone,shopName,zipCode, addressLine1, addressLine2, city, state:selectedState, shopOpenTime,shopCloseTime,deliveryRadiusInKm,adminToken
  })
}
  return (
      <div className="AdminAddOwner">
      <h2 className="AdminAddOwnerHeading">Add Owner</h2>

      <form className="AdminAddOwnerForm">
        <div className="AdminAddOwnerField">
          <label>Owner Name</label>
          <input type="text" onChange={(e)=>setOwnerName(e.target.value)} value={ownerName} />
        </div>

        <div className="AdminAddOwnerField">
          <label>Email</label>
          <input type="email"  onChange={(e)=>setEmail(e.target.value)} value={email} />
        </div>

        <div className="AdminAddOwnerField">
          <label>Password</label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}  />
        </div>

        <div className="AdminAddOwnerField">
          <label>Phone</label>
          <input type="text"  onChange={(e)=>setPhone(e.target.value)} value={phone} />
        </div>

        <div className="AdminAddOwnerField">
          <label>Shop Name</label>
          <input type="text"  onChange={(e)=>setShopName(e.target.value)} value={shopName} />
        </div>

        <div className="AdminAddOwnerField">
          <label>Zip Code</label>
          <input type="text"  onChange={(e)=>setZipCode(e.target.value)} value={zipCode} />
        </div>

        <div className="AdminAddOwnerField AdminAddOwnerFull">
          <label>Address Line 1</label>
          <input type="text"   onChange={(e)=>setAddressLine1(e.target.value)} value={addressLine1}/>
        </div>

        <div className="AdminAddOwnerField AdminAddOwnerFull">
          <label>Address Line 2</label>
          <input type="text"  onChange={(e)=>setAddressLine2(e.target.value)} value={addressLine2} />
        </div>

        <div className="AdminAddOwnerField">
          <label>City</label>
          <input type="text"  onChange={(e)=>setCity(e.target.value)} value={city} />
        </div>

        {/* ✅ Country Dropdown */}
        {/* <div className="AdminAddOwnerField">
          <label>Country</label>
          <select defaultValue="India" onChange={(e)=>set}>
            <option value="India">India</option>
          </select>
        </div> */}

        <div className="AdminAddOwnerField">
          <label>State</label>
          <select  onChange={(e)=>setSelectedState(e.target.value)} value={selectedState}>
             <option value="">Select State</option>
            <option value="Kerala">Kerala</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
          </select>
        </div>

        <div className="AdminAddOwnerField">
          <label>Shop Open Time</label>
          <input type="time"  onChange={(e)=>setShopOpenTime(e.target.value)} value={shopOpenTime} />
        </div>

        <div className="AdminAddOwnerField">
          <label>Shop Close Time</label>
          <input type="time"  onChange={(e)=>setShopClosingTime(e.target.value)} value={shopCloseTime} />
        </div>

        <div className="AdminAddOwnerField AdminAddOwnerFull">
          <label>Delivery Radius (Km)</label>
          <input type="number"  onChange={(e)=>setDeliveryRadiusInKm(e.target.value)} value={deliveryRadiusInKm} />
        </div>

        <button type="submit" className="AdminAddOwnerButton" onClick={handleAddOwner}>
          Save Owner
        </button>
      </form>
    </div>
  )
}
