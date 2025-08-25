import React from 'react'
import { AdminNavbar } from '../AdminComponents/AdminNavbar/AdminNavbar'
import { AdminAddOwner } from '../AdminComponents/AdminAddOwner/AdminAddOwner'

export const AdminAddOwnerPage = () => {
  return (
    <div>
      <div style={{display:"flex"}}>
 <AdminNavbar/>
        
        <AdminAddOwner/>
      </div>
       
    </div>
  )
}
