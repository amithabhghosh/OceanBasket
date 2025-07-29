import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("userToken"));
  const [addressText, setAddressText] = useState('');
  const [showAddress, setShowAddress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (user?.address?.length > 0) {
      const addr = user.address[0];
      setAddressText(`${addr.addressLine1}, ${addr.city}, ${addr.zipCode}`);
    } else {
      const zipCode = localStorage.getItem("zipCode");
      setAddressText(zipCode ? `Pincode: ${zipCode}` : "No Address Found");
    }
  }, []);

  return (
    <div className='Navbar'>
      <div className="navbarHeading">
        <p>My</p>
        <p>Ocean</p>
        <p>Basket</p>
      </div>

      <div className="navbarIcons">
        {isLogin ? (
          <>
            <div
              className="location-icon-wrapper"
              onMouseEnter={() => setShowAddress(true)}
              onMouseLeave={() => setShowAddress(false)}
            >
              <ion-icon name="location-outline"></ion-icon>
              {showAddress && (
                <div className="tooltip-address-tab">
                  {addressText}
                </div>
              )}
            </div>

            <ion-icon name="cart-outline" onClick={() => navigate("/cart")}></ion-icon>
            <ion-icon name="person-outline" onClick={() => navigate("/profile")}></ion-icon>
          </>
        ) : (
          <button className='Navbar-Sign-In-Button' onClick={() => navigate("/")}>Sign In</button>
        )}
      </div>
    </div>
  );
};
