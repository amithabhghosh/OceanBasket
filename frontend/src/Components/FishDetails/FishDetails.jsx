import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ContextAPI } from "../../Context/ContextAPI"; // adjust path if needed
import "./FishDetails.css"; // ensure this file styles layout
import axios from "axios";
import LoginSignupModal from "../LoginSignUpModel/LoginSignupModal";
import { toast } from 'react-toastify';

export const FishDetails = () => {
  const  {id}  = useParams();
  const { fishes } = useContext(ContextAPI);
  const [quantity, setQuantity] = useState(0.5);
console.log(id)
  
const fish = fishes.find((item) => item.id.toString() === id);

  const increase = () => setQuantity((prev) => Math.min(prev + 0.5, 10));
  const decrease = () => setQuantity((prev) => Math.max(prev - 0.5, 0.5));

  if (!fish) {
    return <div style={{ padding: "2rem" }}>Fish not found.</div>;
  }

  const [showPopUp,setShowPopUp] = useState(false)
const cartAdding=async(id,quantity,price,name)=>{
const token = localStorage.getItem("Token");

if (!token) {
   setShowPopUp(true)
    return;
  }
  const actualPrice = quantity*price*2

  try {
    const response = await axios.post(
      "https://oceanbasket.onrender.com/api/customer/cart", // Your backend URL
      { productId:id, price:actualPrice ,quantity,name},
      {
        headers: {
          token: token,
        },
      }
    );
toast.success(response.data.message || "Added to cart successfully!");

    console.log("Cart updated:", response.data);
  } catch (error) {
    console.log("Add to cart failed:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Add to cart failed!");

  }
}


  return (
    <>
    <div className="fishDetails">
      <div className="fishDetailImage">
        <img src={fish.image} alt={fish.name} />
      </div>

      <div className="fishDetailList">
        <div className="fishDetailName">
          <h3>{fish.name}</h3>
          <h1>₹{fish.price} / {fish.quantity}g</h1>
        </div>

        <div className="fishDetailStock">
          <h4>Availability: <span>{fish.availabilty ? "IN STOCK" : "OUT OF STOCK"}</span></h4>
          <h4>Category: <span>{fish.category==="Bony" ? "Bony Fish" : fish.category === "Oily" ? "Oily Fish" : fish.category==="Salt"? "Salt Water Fish" : fish.category==="Freshwater" ? "Fresh Water Fish" : fish.category==="Cart" ? "Cartilaginous Fish" : "Fish"}</span></h4>
        </div>

        <div className="fishDetailQuantity">
          <h4>Quantity (kg):</h4>
          <div className="quantity-controller">
            <button onClick={decrease}>-</button>
            <span>{quantity.toFixed(1)}</span>
            <button onClick={increase}>+</button>
          </div>
        </div>

        <div className="fishDetailAddtoCart">
      <button onClick={() => cartAdding(id, quantity, fish.price,fish.name)}>Add to Cart</button>
        </div>
      </div>
    </div>

    {showPopUp && (
  <LoginSignupModal isOpen={true} onClose={() => setShowPopUp(false)} />
)}
    </>
  );
};
