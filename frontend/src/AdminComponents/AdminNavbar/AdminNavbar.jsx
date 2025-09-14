import React, { useState } from 'react'
import "./AdminNavbar.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const AdminNavbar = () => {
const navigate = useNavigate()
  const location = useLocation();
const currentPath = location.pathname;
    const [isOpen, setIsOpen] = useState(false);
const handleAdminLogout = ()=>{
  localStorage.removeItem("adminToken")
     localStorage.removeItem("adminRefreshToken")
     localStorage.removeItem("audioAllowed")
     toast.success("Logout Success")
     navigate("/admin/login")
}

  return (
    <>
{isOpen ? (      <ion-icon name="close-outline" className={`hamburger ${isOpen ? "navOpen" : ""}`} onClick={() => setIsOpen(!isOpen)}></ion-icon> ) : (<ion-icon name="menu" className="hamburger" onClick={() => setIsOpen(!isOpen)}></ion-icon>)}

    {/* Sidebar */}
      <div className={`adminNavbar ${isOpen ? "open" : ""}`}>
        <div className="adminNavList">
          <div className="adminCustomerNav" onClick={()=>navigate("/admin/analatics")}>
            <ion-icon name="analytics"></ion-icon>
            <p>Analytics</p>
          </div>
          <div className="adminCustomerNav" onClick={()=>navigate("/admin/customer")} style={{color : currentPath==="/admin/customer" ? "#5fbaff " : "white" }}>
            <ion-icon name="person"></ion-icon>
            <p>Customers</p>
          </div>
          <div className="adminOwnerNav" onClick={()=>navigate("/admin/owner")} style={{color:currentPath === "/admin/owner"? "#5fbaff " : "white"}}>
            <ion-icon name="storefront"></ion-icon>
            <p>Owners</p>
          </div>
          <div className="adminFishNav" onClick={()=>navigate("/admin/fishes")} style={{color:currentPath === "/admin/fishes"? "#5fbaff " : "white" }}>
            <ion-icon name="fish"></ion-icon>
            <p>Fishes</p>
          </div>
          <div className="adminOrdersNav" onClick={()=>navigate("/admin/orders")} style={{color:currentPath === "/admin/orders"? "#5fbaff " : "white"}}>
            <ion-icon name="briefcase"></ion-icon>
            <p>Orders</p>
          </div>
             <div className="adminLogoutNav" onClick={handleAdminLogout}>
            <ion-icon name="power"></ion-icon>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </>
  )
}
