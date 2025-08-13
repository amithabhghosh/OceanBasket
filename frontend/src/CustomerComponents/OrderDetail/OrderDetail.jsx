import React from 'react'
import "./OrderDetail.css"
export const OrderDetail = ({data}) => {
  return (
    <div className='OrderDetail'>
          <span onClick={() => navigate(-1)} className='orderDetailPageBackButton'><ion-icon name="arrow-back-outline" ></ion-icon> Back</span>
<h2>Orders</h2>
<div className="orderDetailLists">
    {data?.order?.items.map((item)=>(
        <div className='orderDetailListCard'>
            <div className="orderDetailCardImage">
                <img src={item.image} alt="" />
            </div>
            <div className="orderDetailCardDetail">
                <div className="orderDeatilCardName">
                    <p>{item.name}</p>
                </div>
                <div className="orderDetailCardQuantityDetails">
                    <p>Quantity : {item.quantity}Kg</p>
                    <p>Price : ₹{item.price}</p>
                    <p>Type : {item.type}</p>
                </div>
            </div>
        </div>
    ))}
</div>
    </div>
  )
}
