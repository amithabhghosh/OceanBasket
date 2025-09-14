import React from 'react'
import { AdminNavbar } from './AdminNavbar/AdminNavbar'

export const AdminLayout = ({children}) => {
  return (
     <div style={{display:"flex"}}>
      <div style={{ position: "fixed", top: 0, left: 0, height: "100vh" }}>
        <AdminNavbar />
      </div>
      <div className="adminRightPage">
        {children}
      </div>
    </div>
  )
}
