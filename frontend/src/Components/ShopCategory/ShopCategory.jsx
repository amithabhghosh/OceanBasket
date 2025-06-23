import React from 'react'
import "./ShopCategory.css"
import { Link, useNavigate } from 'react-router-dom'
export const ShopCategory = () => {
      const navigate = useNavigate()
  return (

        <div className="ShopCategory">
             <p onClick={()=>navigate("/BonyFish")} className="category-item">Bony Fish</p>
  <p onClick={()=>navigate("/Cartilaginous")} className="category-item">Cartilaginous</p>
  <p onClick={()=>navigate("/FreshWaterFish")}className="category-item">Freshwater Fish</p>
  <p onClick={()=>navigate("/SaltWaterFish")} className="category-item">Saltwater Fish</p>
  <p onClick={()=>navigate("/OilyFish")} className="category-item">Oily Fish</p>
        </div>

  )
}
