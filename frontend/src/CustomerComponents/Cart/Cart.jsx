import React, { useState } from 'react'
import "./Cart.css"
import { deleteCart, updateCart } from '../../api/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
export const Cart = ({image,name,quantity:initialQty,price,fishPrice,totalPrice,productId,refetch,handleCartChange}) => {
const token = localStorage.getItem("userToken");
const [quantity, setQuantity] = useState(initialQty);

const deleteCartMutation = useMutation({
    mutationFn: () => deleteCart({ token, productId }),
    onSuccess: () => {
      toast.success("Item removed from cart");
        if (handleCartChange) handleCartChange();
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || error.message;
      toast.error(msg || "Failed to delete cart item");
    }
  });


  const updateQuantityMutation = useMutation({
    mutationFn: (cartData) => updateCart({ ...cartData, token }),
    onSuccess: (data) => {
      
        if (handleCartChange) handleCartChange();
    },
    onError: (err) => {
      const message = err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
    },
  });

  const handleQuantityChange = (delta) => {
    const newQty = Math.round((quantity + delta) * 10) / 10;
    if (newQty < 0.5) return;

    setQuantity(newQty); 
    updateQuantityMutation.mutate({
      productId,
      quantity: newQty,
      price:fishPrice,
    });
  };


  return (
    <>
    {deleteCartMutation.isLoading ? <LoadingSpinner/>:(
      <div className='cart'>
<div className="cartImage">
    <img src={image} alt="" />
    <div className="cartDetails">
<h4>{name}</h4>
<p>₹{fishPrice/2} <span>/500g</span></p>
    </div>
</div>
<div className="cartPriceQunatitySection">
    <div className="cartQuantitySection">
        <p onClick={() => handleQuantityChange(-0.5)}>-</p>
        <span>{quantity} Kg</span>
        <p onClick={() => handleQuantityChange(0.5)}>+</p>
    </div>
    <h4>₹{price}</h4>
</div>
<ion-icon name="trash-outline" className="cartDeleteIcon" onClick={() => deleteCartMutation.mutate()}
></ion-icon>
    </div>
    )}
    

</>
  )
}
