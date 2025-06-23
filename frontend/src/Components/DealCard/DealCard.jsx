import React, { useState } from 'react'
import "./DealCard.css"
import { useNavigate } from 'react-router-dom'
import LoginSignUpModal from  "../LoginSignUpModel/LoginSignupModal"
import axios from 'axios'
import { toast } from 'react-toastify'
export const DealCard = ({key,id,name,off,price,quantity,image,deal}) => {
const [showPopUp,setShowPopUp] = useState(false)
const cartAdding=async(id,price)=>{
const token = localStorage.getItem("Token");

if (!token) {
   setShowPopUp(true)
    return;
  }
  try {
    const response = await axios.post(
      "http://localhost:5000/api/customer/quantityCart", // Your backend URL
      { productId:id, price ,name},
      {
        headers: {
          token: token,
        },
      }
    );
toast.success(response.data.message || "Added to cart successfully!");

    console.log("Cart updated:", response.data);
  } catch (error) {
    toast.error(error.response?.data?.message || "Add to cart failed!");

    console.error("Add to cart failed:", error.response?.data || error.message);
  }
}

    const navigate = useNavigate()
  return (
    <>
   <div className="fish-card" onClick={()=>navigate(`/fish/${id}`)}>
      <div className="img-wrapper">
        <img src={image} alt={name} className="fish-image" />
        {deal && <span className="offer-badge">{off}% OFF</span>}
      </div>
      <div className="fish-details">
       <h3 className="fish-name">
  {name.length > 30 ? `${name.slice(0, 30)}...` : name}
</h3>

       <p className="fish-price">
  ₹{price} <span className="fish-qty">/ {quantity}gm</span>
</p>

         <button
      className="add-btn"
      onClick={(e) => {
        e.stopPropagation(); 
        cartAdding(id, price,name);
      }}
    >
      Add to Cart
    </button>

      </div>
    </div>
    {showPopUp && (
  <LoginSignUpModal isOpen={true} onClose={() => setShowPopUp(false)}/>
)}
    </>
  )
}
