import React from 'react'
import "./AdminCustomer.css"
import { AdminCustomerCard } from '../AdminCustomerCard/AdminCustomerCard'
import EmptySection from '../../CustomerComponents/EmptySection/EmptySection'
export const AdminCustomer = ({data,refetch}) => {
if(data.customers.length == 0){
  return <EmptySection message={"No Customers"}/>
}

  return (
    <div className='AdminCustomer'>
<div className="adminCustomerHeading">
  <h2>Customers</h2>
</div>
<div className="adminCustomersLists">
  {data.customers.map((customer)=>(
  <AdminCustomerCard refetch={refetch} id={customer._id} name={customer.name} email={customer.email} phone={customer.phone} verified={customer.verified}/>
  ))}

</div>
    </div>
  )
}
