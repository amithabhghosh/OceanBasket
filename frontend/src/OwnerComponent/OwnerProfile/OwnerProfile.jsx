import React from 'react'
import "./OwnerProfile.css"
import background from  "../../assets/images/background.jpg"
import profile from "../../assets/images/Profile.jpg"
export const OwnerProfile = () => {
  return (
    <section className='ownerProfileMainSection'>
      <div className='ownerProfileDetailsMainSection'>
        <div className='ownerProfileBackgroundAndProfileImageSection' style={{backgroundImage: `url(${background})`}}>
          <img className='ownerProfileImage' src={profile} alt="Profile Image Of Owner"/>
        </div>
        <div className="ownerProfileDetailsSection">
          <div className='ownerProfileNameAndAddressSection'>
            <h2 className='ownerProfileName'>Shibu Kadappuarm</h2>
            <p className='ownerProfileAddress'>Shibu House Vaadiyil Nagar House No:78 ,Thangassery East ,Kollam - 691014</p>
          </div>
          <div className='ownerProfileShopDetailsSection'>
            <h3>Shop Details</h3>
            <div className='ownerShopOwnerSection'>
              <p>Shop Owner</p>
              <h3>Shibu Joseph</h3>
            </div>
            <div className='ownerShopNameSection'>
              <p>Shop Name</p>
              <h3>Thangassery Mart</h3>
            </div>
            <div className='ownerShopAddressSection'>
              <p>Shop Address</p>
              <h3>Thangassery Mart Shop No:12 opposite Supreme Supermarket Main Road Chinnakkada Kollam - 691001</h3>
            </div>
            <div className="ownerShopLiscenseNumberSection">
              <p>License Number</p>
              <h3>LN78452126329D</h3>
            </div>
            <div className="ownerShopDetailsToBeAddedSection1">
              <p>Lorem, ipsum.</p>
              <h3>Lorem ipsum dolor sit amet.</h3>
            </div>
            <div className="ownerShopDetailsToBeAddedSection2">
              <p>Lorem, ipsum.</p>
              <h3>Lorem ipsum dolor sit amet.</h3>
            </div>
            <div className="ownerShopDetailsToBeAddedSection3">
              <p>Lorem, ipsum.</p>
              <h3>Lorem ipsum dolor sit amet.</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
