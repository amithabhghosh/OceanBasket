import React, { useEffect, useState } from 'react'
import "./CartComponent.css"
import fish from "../../assets/images/fish4.jpg"
import { getCart } from '../../api/auth';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { Cart } from '../Cart/Cart';
import { useNavigate } from 'react-router-dom';
export const CartComponent = ({data,refetch}) => {
  const navigate = useNavigate();
const token = localStorage.getItem("userToken");
const [totalPrice, setTotalPrice] = useState(0);
 


      const calculateTotalPrice = () => {
    if (data?.cart?.[0]?.items?.length > 0) {
      const total = data.cart[0].items.reduce((sum, item) => {
        return sum + item.price;
      }, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  };

useEffect(() => {
  if (data) {
    calculateTotalPrice();
  }
}, [data]);

const handleCartChange = async () => {
  await refetch(); 
};



    



  return (
    <div className='CartComponent'>
        <div className="topCartSection">
             <p onClick={() => navigate(-1)}><ion-icon name="arrow-back-outline" ></ion-icon> Back</p>
        </div>
        <div className="cartSection">
            <div className="cartListSection">
<h2>Your Basket</h2>
<div className="cartLists">
{data.cart[0]?.items?.map((item)=>(
  <Cart image={item.image} name={item.name} fishPrice={item.fishPrice} price={item.price} quantity={item.quantity} productId={item.productId} refetch={refetch} id={item._id} handleCartChange={handleCartChange}/>
))}
</div>

<div className="cartUpdateCartMobile">
<ion-icon name="repeat-outline"></ion-icon>
<p>Update cart</p>
              </div>

<div className="cartCouponSection">
              <div className="cartCouponInputSection">
                <p>Have a coupon? Enter your code</p>
                <div className="cartCouponInputBtns">
 <input type="text" placeholder='Coupon Code'/>
 <button>Apply</button>
                </div>
               
              </div>
              <div className="cartUpdateCart">
<ion-icon name="repeat-outline"></ion-icon>
<p onClick={handleCartChange}>Update cart</p>
              </div>
              
            </div>

            </div>

            
            <div className="cartTotalSection">
<div className="cartTotalHeading">
  <h3>Your Total</h3>
</div>
<div className="cartTotalDetails">
  <div className="cartItemSubTotal">
    <p>Item Total</p>
    <p>₹{data.cart[0]?.totalPrice}</p>
  </div>
  <div className="cartShippingDetail">
    <p>Shipping</p>
    <p>₹30</p>
  </div>
  <div className="cartGstDetails">
    <p>GST & Other Charges</p>
    <p>₹10</p>
  </div>
</div>
<div className="cartTotalDetailAmount">
  <p>Total</p>
  <p>₹{data.cart[0]?.totalPrice + 30 + 10}</p>
</div>
<div className="cartShoppingButtons">
  <button onClick={()=>navigate("/checkout")} disabled={data.cart[0]?.items.length == 0} >Proceed to Checkout</button>
  <p onClick={()=>navigate("/dashboard")}><ion-icon name="arrow-back-outline"></ion-icon >Continue Shopping</p>
</div>
            </div>
        </div>
    </div>
  )
}
