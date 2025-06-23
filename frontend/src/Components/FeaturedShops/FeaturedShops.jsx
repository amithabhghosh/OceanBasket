import React, { useContext } from 'react'
import "./FeaturedShops.css"
import { ContextAPI } from '../../Context/ContextAPI'
import { FeaturedShopCard } from '../FeaturedShopCard/FeaturedShopCard'
export const FeaturedShops = () => {
    const {shops} = useContext(ContextAPI)
  return (
   <div className="FeaturedShops">
  <div className="FeaturedShopHead">
    <h3>Featured Shops</h3>
  </div>
  <div className="featuredShopCards">
    {shops.map((shop) => (
      <FeaturedShopCard
        key={shop.id}
        name={shop.name}
        place={shop.place}
        image={shop.image}
      />
    ))}
  </div>
</div>

  )
}
