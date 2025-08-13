import React from 'react'
import "./OrderCard.css"
import { useNavigate } from 'react-router-dom'
export const OrderCard = ({id,totalQuantity,totalPrice,orderStatus,paymentStatus,paymentMethod,items,createdAt,shopsNotified}) => {
  const navigate = useNavigate()
   return (
    <div className='order-card' onClick={()=>navigate(`/order/${id}`)}>
              <img className='order-card-img' src={shopsNotified[0].shopImage} alt="fishimage"/>
              <div className='order-card-texts'>
              <div className='order-card-items'>
                 <p className='order-card-shopname'>{shopsNotified[0].shopName}</p>
                 <p className='order-card-fishname'>Quantity: {totalQuantity}</p>
                 <div className='order-card-price'>
                    <p className='order-card-amount'>₹{totalPrice}</p>
                    <p className='order-card-qty'>Items:{items.length}</p>
                    <p className='order-card-size'>Payment :{paymentMethod}</p>
                 </div>
                 <p className='order-card-date'>
                <span>Date:</span>   {new Date(order.createdAt).toLocaleString()}
                 </p>
              </div>
              <div className='order-card-status'>
                <div className='order-card-delivery'>
                    <p className='order-card-delivery-status'>
                       Takes Up To 2 Hours
                    </p>
                 </div>

                 <div className='order-card-order'>
                    <p className='order-card-order-status'>{orderStatus}</p>
                 </div>
              </div>
               </div>
           </div>
  )
}
