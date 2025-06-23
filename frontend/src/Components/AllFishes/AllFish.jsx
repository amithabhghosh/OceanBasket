import React, { useContext } from 'react'
import "./AllFish"
import { DealCard } from '../DealCard/DealCard'
import { ContextAPI } from '../../Context/ContextAPI'
export const AllFish = () => {

    const {fishes} = useContext(ContextAPI)
  return (
     <div className="dailyDeals">
          <div className="dailyHead">
            <h3>Fresh Fishes</h3>
          </div>
          <div className="dailyDealCards">
            {fishes.map((fish) => (
                
    <DealCard key={fish.id} id={fish.id} name={fish.name} price={fish.price} quantity={fish.quantity} off={fish.off} image={fish.image} deal={fish.deal}/>
               
              
            ))}
          </div>
        </div>
  )
}
