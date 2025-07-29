import React from 'react'
import "./HomeBanner.css"
import oceanImageReverse from "../../assets/images/oceanImageReverse.png"
import banner from "../../assets/images/banner.webp"
export const HomeBanner = () => {
  return (
    <div className="bannerContainer" style={{ backgroundImage: `url(${oceanImageReverse})` }}>
      <div className="searchBar">
        <input type="text" placeholder="Search" />
          <ion-icon name="search-outline"></ion-icon>
      </div>
      <div className="bannerImageContainer">
<div className="bannerImage" style={{backgroundImage:`url(${banner})`}}>
  
    <p>Pre <br />Book  <ion-icon name="arrow-forward-outline" className="rightArrowIcon"></ion-icon></p>
    
</div>
      </div>

      
    </div>
  )
}
