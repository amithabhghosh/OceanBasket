import React from 'react'
import  "./OrderList.css"
import { OrderCard } from '../OrderCard/OrderCard'
export const OrderList = ({data}) => {
 const orders = data?.orders || [];
    
  return (

    <div className='order-my-orders'>
           {orders.map((order)=>(
<OrderCard 
id= {order._id} 
totalQuantity = {order.totalQuantity}
 totalPrice={order.totalPrice}
  orderStatus={order.orderStatus}
   paymentStatus={order.paymentStatus}
   paymentMethod={order.paymentMethod}
   items = {order.items}
   createdAt={order.createdAt}
   shopsNotified={order.shopsNotified}
   />
           ))}
           

    </div>

  )
}
