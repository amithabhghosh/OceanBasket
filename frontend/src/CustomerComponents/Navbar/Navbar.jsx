import React, { useState } from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
export const Navbar = () => {
    
const [isLogin,setIsLogin] = useState(localStorage.getItem("userToken")?true:false)
const navigate = useNavigate()
  return (
    <div className='Navbar'>
<div className="navbarHeading">
    <p>My</p>
    <p>Ocean</p>
    <p>Basket</p>
</div>

<div className="navbarIcons">
    {isLogin?(
        <>
<ion-icon name="location-outline"></ion-icon>
    <ion-icon name="cart-outline" onClick={()=>navigate("/cart")}></ion-icon>
    <ion-icon name="person-outline"></ion-icon>
        </>
    )
: (
    <>
    <button className='Navbar-Sign-In-Button' onClick={()=>navigate("/")}>Sign In</button>
    </>
)
    }
    
</div>
    </div>
  )
}
