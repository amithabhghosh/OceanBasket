import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./AdminAnaltytics.css"
import { addpercentage } from '../../api/Admin';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
export const AdminAnaltytics = ({data,refetch}) => {
const [percentage,setPercentage] = useState()

  const adminToken = localStorage.getItem("adminToken")



 const {mutate,isPending,isSuccess,isError,error} = useMutation({
    mutationFn:addpercentage,
    onSuccess:(data)=>{
    toast.success("Percentage Added")
    setPercentage()
    refetch()

    },
    onError:(err)=>{
      const message = err?.response?.data?.message || err.message || "Something went wrong";
           toast.error(message);
     
    }
})


const addPercentageClick = ()=>{
if(!percentage || percentage.trim() === ""){
  return toast.info("Field is Empty")
}

mutate({adminToken,percentage})
}
  return (
  <div className="dashboard">
      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{data.stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Amount</h3>
          <p>₹{data.stats.totalAmount}</p>
        </div>
        <div className="stat-card">
          <h3>Customers</h3>
          <p>{data.stats.totalCustomers}</p>
        </div>
        <div className="stat-card">
          <h3>Owners</h3>
          <p>{data.stats.totalOwners}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-card">
        <h3>Orders & Amount (This Week)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.dailyOrders}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#0077ff" name="Orders" />
            <Bar dataKey="amount" fill="#00c49f" name="Amount (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
<div className="alreadyAddedPercentage">
  <p>Percentage : {data?.admin?.percentage ? `${data?.admin?.percentage}%`  : "Not Yet Added"}</p>
</div>
      <div className="addingPercentageInputs">
        <input type="text"  placeholder='Add Percentage' onChange={(e)=>setPercentage(e.target.value)} value={percentage}/>
        <button onClick={addPercentageClick}>{data.admin.percentage ? "Update" : "Add" }</button>
      </div>
    </div>
  )
}
