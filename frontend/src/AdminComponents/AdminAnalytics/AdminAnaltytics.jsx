import React from 'react'
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
export const AdminAnaltytics = ({data}) => {

    console.log(data)

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
    </div>
  )
}
