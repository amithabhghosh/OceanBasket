import React from 'react'
import "./OwnerNavbar.css"
import { useNavigate } from 'react-router-dom'
export const OwnerNavbar = () => {
  const navigate = useNavigate()
  return (
 <>
     <nav className="owner-nav-bar">
        <div className="owner-nav-name">
            <p>My <br />Ocean <br />basket </p>
        </div>
        <div className="owner-nav-items">
            <a href="">Orders</a>
            <a onClick={()=>navigate("/ownerProfile")}>Profile</a>
        </div>

        

      
     </nav>
     <div className="owner-threeline-icon">
             <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
          <div className="owner-nav-dropdown">
               <a href="">Orders</a>
            <a onClick={()=>navigate("/ownerProfile")}>Profile</a>
        </div>
    </>
  )
}
