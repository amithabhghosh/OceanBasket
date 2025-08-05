import React, { useContext } from 'react'
import { ContextAPI } from '../../Context/ContextAPI'
import "./SeperateFishSection.css"
import { useParams } from 'react-router-dom'
import { getFishesByName } from '../../api/auth'
import { useQuery } from '@tanstack/react-query';
import { FishCard } from '../FishCard/FishCard'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
export const SeperateFishSection = ({data,isError}) => {
    
 if (isError || data?.success === false) return <p >{data?.message || "Error fetching fishes"}</p>;
      const fishList = data?.fishes || []
  return (
        <div className='seperateFishSection'>

<div className="SeperateFishesLists">
{fishList.map((item)=>(
    <FishCard image={item.image} name={item.name} price={item.pricePerKg} id={item._id}/>
))}
</div>
    </div>
  )
}
