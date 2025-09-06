import React, { useState } from 'react';
import "./OwnerOrderCard.css";
import { updateOrderByOwner } from '../../api/owner';
import {LoadingSpinner} from "../../CustomerComponents/LoadingSpinner/LoadingSpinner"
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import EmptySection from '../../CustomerComponents/EmptySection/EmptySection';
export const OwnerOrderCard = ({ data, refetch }) => {
  const orders = data?.orders || [];
  const [expandedOrder, setExpandedOrder] = useState(null);
const ownerToken = localStorage.getItem("ownerToken")
 const navigate = useNavigate()
  const toggleItems = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleStatusChange = async (orderId, newStatus) => {
 mutate({
  orderId,
ownerToken,
status:newStatus
 })
  };

  const {mutate,isPending,isSuccess,isError,error} = useMutation({
      mutationFn:updateOrderByOwner,
      onSuccess:(data)=>{
      
      toast.success("Status Updated")
  refetch()
      },
      onError:(err)=>{
          toast.error('Login error:', err.response?.data?.message || err.message)
          navigate("/ownerSignup");
      }
  })
if(isPending){
  return <LoadingSpinner/>
}

if(orders.length == 0){
  return <EmptySection message={"No Orders"}/>
}
  return (
    <div className="ownerOrdersContainer">
      {orders.map((order) => (
        <div className="orderCard" key={order._id}>
          <div className="orderSummary">
            <p><strong>Total Quantity :</strong> {order.totalQuantity}Kg</p>
            <p><strong>Total Price :</strong> ₹{order.totalPrice}</p>
            <p><strong>Payment Status :</strong> {order.paymentStatus}</p>

            <div className="statusDropdown">
              <label><strong>Order Status :</strong></label>
              {order.orderStatus === "delivered" ? <p>Delivered</p> : <>
                    <select
  className="customDropdown"
  value={order.orderStatus}
  onChange={(e) => handleStatusChange(order._id, e.target.value)}
>

  <option value="preparing">Preparing</option>
  <option value="out for delivery">Out for Delivery</option>
</select>
              
              </>}
       

            </div>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            className="viewItemsBtn"
            onClick={() => toggleItems(order._id)}
          >
            {expandedOrder === order._id ? "Hide Items" : "View Items"}
          </button>

          {expandedOrder === order._id && (
            <div className="itemsList">
              {order.items.map((item) => (
                <div className="itemCard" key={item._id}>
                  <img src={item.image} alt={item.name} />
                  <div className="itemDetails">
                    <p><strong>{item.name}</strong></p>
                    <p>Quantity: {item.quantity}Kg</p>
                    <p>Price: ₹{item.price}</p>
                    <p>Type: {item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
