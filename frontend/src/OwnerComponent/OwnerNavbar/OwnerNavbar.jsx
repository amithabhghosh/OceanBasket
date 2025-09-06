import React, { useState } from 'react'
import "./OwnerNavbar.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export const OwnerNavbar = () => {
  const navigate = useNavigate()

 const location = useLocation();
const currentPath = location.pathname;

const ownerLogOut = () =>{
  localStorage.removeItem("ownerToken")
  localStorage.removeItem("ownerRefreshToken")
  toast.success("Logout Success")
navigate("/ownerSignUp")
}

  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("ownerToken"));
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
           

            <ion-icon name="bag" onClick={() => navigate("/owner/orders")} style={{ color: currentPath === '/owner/orders' ? '#5fbaff' : '#eaf6ff' }}></ion-icon>
            <ion-icon name="person-outline" onClick={() => navigate("/ownerProfile")} style={{ color: currentPath === '/ownerProfile' ? '#5fbaff' : '#eaf6ff' }}></ion-icon>
            <ion-icon name="power" onClick={ownerLogOut}></ion-icon>
          </>
        ) : (
          <button className='Navbar-Sign-In-Button' onClick={() => navigate("/ownerSignUp")}>Sign In</button>
        )}
      </div>
    </div>
  )
}
