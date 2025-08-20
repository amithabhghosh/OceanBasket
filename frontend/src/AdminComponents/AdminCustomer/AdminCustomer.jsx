import React from 'react'
import "./AdminCustomer.css"
import { AdminCustomerCard } from '../AdminCustomerCard/AdminCustomerCard'
export const AdminCustomer = ({data}) => {
  return (
    <div className='AdminCustomer'>
<div className="adminCustomerHeading">
  <h2>Customers</h2>
</div>
<div className="adminCustomersLists">
  {data.customers.map((customer)=>(
  <AdminCustomerCard name={customer.name} email={customer.email} phone={customer.phone} verified={customer.verified}/>
  ))}

</div>
    </div>
  )
}
