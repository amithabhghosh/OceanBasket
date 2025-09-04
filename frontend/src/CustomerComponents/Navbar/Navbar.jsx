import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updatelocationByCustomer } from '../../api/auth';
import { toast } from 'react-toastify';

export const Navbar = () => {
  const location = useLocation();
const currentPath = location.pathname;

  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("userToken"));
  const [addressText, setAddressText] = useState('Change Location');
  const [showAddress, setShowAddress] = useState(false);
  const navigate = useNavigate();
  const [deliveryLocation, setDeliveryLocation] = useState(null);
const token = localStorage.getItem("userToken")
const Location = useMutation({
    mutationFn: ({ lat, lng, token }) =>
      updatelocationByCustomer({ lat, lng, token }),
    onSuccess: (data) => {
         localStorage.setItem("lat", deliveryLocation.lat);
          localStorage.setItem("lng", deliveryLocation.lng);
      toast.success("Location updated");
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
      console.error(errorMessage);
    },
  });

   const fetchCurrentLocation = () => {
      if (!navigator.geolocation) {
        toast.error("Geolocation not supported by your browser");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setDeliveryLocation(newLocation);
          
          
  
    
          Location.mutate({ ...newLocation, token });
        },
        (error) => {
          toast.error("Failed to fetch location");
          console.error(error);
        }
      );
    };
  


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
            onClick={fetchCurrentLocation}
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
