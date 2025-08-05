import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useNavigate,useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
const currentPath = location.pathname;

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

            <ion-icon name="cart-outline" onClick={() => navigate("/cart")} style={{ color: currentPath === '/cart' ? '#5fbaff' : '#eaf6ff' }}></ion-icon>
            <ion-icon name="person-outline" onClick={() => navigate("/profile")} style={{ color: currentPath === '/profile' ? '#5fbaff' : '#eaf6ff' }}></ion-icon>
          </>
        ) : (
          <button className='Navbar-Sign-In-Button' onClick={() => navigate("/")}>Sign In</button>
        )}
      </div>
    </div>
  );
};
