import React from 'react'
import { AdminNavbar } from '../AdminComponents/AdminNavbar/AdminNavbar'
import { AdminAddOwner } from '../AdminComponents/AdminAddOwner/AdminAddOwner'
import { AdminLayout } from '../AdminComponents/AdminLayout'

export const AdminAddOwnerPage = () => {
  return (
   <AdminLayout>
     <AdminAddOwner/>
   </AdminLayout>
  )
}
