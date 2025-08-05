import React from 'react'
import "./OwnerFishList.css"
import { OwnerCard } from '../OwnerCard/OwnerCard'
import { useNavigate } from 'react-router-dom'

export const OwnerFishList = ({data,isLoading,isError}) => {

  const navigate = useNavigate()
const fishes = data?.fishes
  return (
    <div className='OwnerFishList'>
<div className="ownerFishAddButton">
<button onClick={()=>navigate("/owner/addFish")}>Add Fish</button>
</div>

<div className="ownerOwnFishesContainer">
{fishes.length == 0 ? <p>No Fishes In the Store</p> : (
 <div className="onwerFishesLists">
  {fishes.map((item)=>(
<OwnerCard image={item.image} name={item.name} price={item.pricePerKg} id={item._id}/>
  ))}
       
    </div>
)}
   
</div>


    </div>
  )
}
