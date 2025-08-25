import React, { useState } from 'react'
import "./AdminOrders.css"
import { useNavigate } from 'react-router-dom';
import { updatedeleiveryStatus } from '../../api/Admin';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../../CustomerComponents/LoadingSpinner/LoadingSpinner';
export const AdminOrders = ({data,refetch}) => {
const orders = data?.orders || []

  const [expandedOrder, setExpandedOrder] = useState(null);
const adminToken = localStorage.getItem("ownerToken")
 const navigate = useNavigate()
  const toggleItems = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleStatusChange = async (orderId, newStatus) => {
 mutate({
  orderId,
adminToken,
status:newStatus
 })
  };

  const {mutate,isPending,isSuccess,isError,error} = useMutation({
      mutationFn:updatedeleiveryStatus,
      onSuccess:(data)=>{
      toast.success("Status Updated")
  refetch()
      },
      onError:(err)=>{
          navigate("/admin/login");
      }
  })
if(isPending){
  return <LoadingSpinner/>
}


  return (
    <div className="adminOrdersContainer">
      <h2 className='adminOrderHeading'>Orders</h2>
      {orders.map((order) => (
        <div className="orderCard" key={order._id}>
          <div className="orderSummary">
            <p><strong>Total Quantity :</strong> {order.totalQuantity}Kg</p>
            <p><strong>Total Price :</strong> ₹{order.totalPrice}</p>
            <p><strong>Payment Status :</strong> {order.paymentStatus}</p>

            <div className="statusDropdown">
              <label><strong>Order Status :</strong></label>
             <select
  className="customDropdown"
  value={order.orderStatus}
  onChange={(e) => handleStatusChange(order._id, e.target.value)}
>
  {order.orderStatus === "delivered" ? (
null
  ) : (
<option value={order.orderStatus}>{order.orderStatus}</option>
  )}
  
  <option value="delivered">Delivered</option>
  
</select>

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
  )
}
