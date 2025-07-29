import React from 'react'
import "./PreBook.css"
import bannerImage from  "../../assets/images/oceanImage.png"
export const PreBook = () => {
  return (
    <div className="preBookBanner">
      <div
        className="bannerImagePre"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="bannerOverlay">
          <p className="bannerText">
            <span>pre</span><br /> book <ion-icon name="arrow-forward-outline"></ion-icon>
          </p>
        </div>
      </div>
    </div>
  )
}
