import React from 'react'
import "./AdminFishes.css"
import { AdminFishCard } from '../AdminFishCard/AdminFishCard'
import EmptySection from '../../CustomerComponents/EmptySection/EmptySection'
export const AdminFishes = ({data}) => {
  if (!data || !data.fishes) {
     return <EmptySection message={"No Fishes"}/>
  }

  return (
    <div className='AdminFishes'>
<div className="adminFishesHeading">
    <h2>Fishes</h2>
</div>
<div className="adminFishesList">

    {data.fishes.map((fish)=>(
 <AdminFishCard id={fish._id} ownerId = {fish.owner} name={fish.name} quantity={fish.availableQuantityKg} price={fish.pricePerKg} image={fish.image} shopName = {fish.owner.ownerName}/>
    ))}
   
   

</div>
    </div>
  )
}
