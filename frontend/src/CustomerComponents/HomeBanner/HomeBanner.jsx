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
<div className="bannerImage">
    <img src={banner} alt="" />
    <p>Pre <br />Book  <ion-icon name="arrow-forward-outline" className="rightArrowIcon"></ion-icon></p>
    
</div>
      
    </div>
  )
}
