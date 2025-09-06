import React, { useState } from 'react'
import "./AdminOrders.css"
import { useNavigate } from 'react-router-dom';
import { updatedeleiveryStatus } from '../../api/Admin';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../../CustomerComponents/LoadingSpinner/LoadingSpinner';
import EmptySection from '../../CustomerComponents/EmptySection/EmptySection';
export const AdminOrders = ({data,refetch}) => {
const orders = data?.orders || []

  const [expandedOrder, setExpandedOrder] = useState(null);
const adminToken = localStorage.getItem("adminToken")
 const navigate = useNavigate()
  const toggleItems = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  
  const handleStatusChange = async (orderId, newStatus) => {
 mutate({
  orderId,
adminToken,
orderStatus:newStatus
 })
  };

  const {mutate,isPending,isSuccess,isError,error} = useMutation({
      mutationFn:updatedeleiveryStatus,
      onSuccess:(data)=>{
      toast.success("Status Updated")
  refetch()
      },
      onError:(err)=>{
          navigate("/admin/login")
      }
  })

const handleCopy = (order) => {
    if (order?.googleMapLink) {
      navigator.clipboard.writeText(order.googleMapLink)
        .then(() => {
          toast.success("Google Maps link copied to clipboard ✅");
        })
        .catch(err => {
          console.error("Failed to copy: ", err);
        });
    }
  };

if(isPending){
  return <LoadingSpinner/>
}
if(orders.length == 0){
  return <EmptySection message={"No Orders"}/>
}

  return (
    <div className="adminOrdersContainer">
      <h2 className='adminOrderHeading'>Orders</h2>
      {orders.map((order) => (
        <div className="orderCard" key={order._id}>
          <div className="AdminOrderSummary">
            <div className='AdminOrderLeftSide'>

           
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

  <button
            className="viewItemsBtn"
            onClick={() => toggleItems(order._id)}
          >
            {expandedOrder === order._id ? "Hide Items" : "View Items"}
          </button>

          </div>

        
           <div className="OrderLocationDetails">
<div className="adminOrderCustomerAddress">
  <p>{order?.deliveryAddress?.addressLine1}</p>
</div>
<div className="adminOrderCustomerAddress">
  <p>{order?.deliveryAddress?.addressLine2}</p>
</div>
<div className="adminOrderCustomerAddress">
  <p>{order?.deliveryAddress?.city}</p>
</div>
<div className="adminOrderCustomerAddress">
  <p>{order?.deliveryAddress?.landmark}</p>
</div>
<div className="adminOrderCustomerAddress">
  <p>{order?.deliveryAddress?.zipCode}</p>
</div>
<div className="adminOrderCustomerAddress">
  <p>{order?.phone},{order?.alternativeNumber}</p>
</div>
 <div className="adminGmapLocationClipBoard">
      {order?.googleMapLink ? (
        <div>
          {/* Clickable link */}
          <a 
            href={order.googleMapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ marginRight: "10px" }}
          >
            Open in Maps
          </a>

          {/* Copy button */}
          <button onClick={()=>handleCopy(order)}>
            Copy Link
          </button>
        </div>
      ) : (
        <p>No location available</p>
      )}
    </div>
 </div>
 </div>

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
