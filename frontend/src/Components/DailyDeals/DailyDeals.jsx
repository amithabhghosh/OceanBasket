import React, { useContext, useEffect, useState } from 'react'
import "./DailyDeals.css"
import { ContextAPI } from '../../Context/ContextAPI'
import {DealCard} from "../DealCard/DealCard"
import "./DailyDeals.css"
export const DailyDeals = () => {

    const {fishes} = useContext(ContextAPI)
const [dealFish, setDealFish] = useState([]);

useEffect(() => {
  setDealFish(fishes.filter((fish) => fish.deal));
}, [fishes]);

  return (
    <div className="dailyDeals">
      <div className="dailyHead">
        <h3>Daily Deals</h3>
      </div>
      <div className="dailyDealCards">
        {dealFish.map((fish) => (
            fish.deal? (
<DealCard key={fish.id} id={fish.id} name={fish.name} price={fish.price} quantity={fish.quantity} off={fish.off} image={fish.image} deal={fish.deal}/>
            ): "No Deals Today"
          
        ))}
      </div>
    </div>
  )
}
