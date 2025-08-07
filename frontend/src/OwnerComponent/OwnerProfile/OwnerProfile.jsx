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
            <h3 className='ownerProfileShopDetailsHeading'>Shop Details</h3>
            <div className='ownerShopOwnerSection'>
              <p className='ownerShopOwnerText'>Shop Owner</p>
              <h3 className='ownerShopOwnerName'>Shibu Joseph</h3>
            </div>
            <div className='ownerShopNameSection'>
              <p className='ownerShopNameText'>Shop Name</p>
              <h3 className='ownerShopName'>Thangassery Mart</h3>
            </div>
            <div className='ownerShopAddressSection'>
              <p className='ownerShopAddressText'>Shop Address</p>
              <h3 className='ownerShopAddress'>Thangassery Mart Shop No:12 opposite Supreme Supermarket Main Road Chinnakkada Kollam - 691001</h3>
            </div>
            <div className="ownerShopLiscenseNumberSection">
              <p className='ownerShopLicenseNumberText'>License Number</p>
              <h3 className='ownerShopLicenseNumber'>LN78452126329D</h3>
            </div>
            <div className="ownerShopDetailsToBeAddedSection1">
              <p className='ownerShopDetailsToBeAddedSection1Text'>Lorem, ipsum.</p>
              <h3 className='ownerShopDetailsToBeAddedSection1Details'>Lorem ipsum dolor sit amet.</h3>
            </div>
            <div className="ownerShopDetailsToBeAddedSection2">
              <p className='ownerShopDetailsToBeAddedSection2Text'>Lorem, ipsum.</p>
              <h3 className='ownerShopDetailsToBeAddedSection2Details'>Lorem ipsum dolor sit amet.</h3>
            </div>
            <div className="ownerShopDetailsToBeAddedSection3">
              <p className='ownerShopDetailsToBeAddedSection3Text'>Lorem, ipsum.</p>
              <h3 className='ownerShopDetailsToBeAddedSection3Details'>Lorem ipsum dolor sit amet.</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
