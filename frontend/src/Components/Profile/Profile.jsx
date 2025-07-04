import React, { useContext, useEffect, useState } from 'react'
import "./Profile.css"
import avatar from "../../assets/images/avatar.jpg"
import { ContextAPI } from '../../Context/ContextAPI'
import { toast } from 'react-toastify'
import API from '../../connectApi'
import { AdressSection } from '../AdressSection/AdressSection'
export const Profile = () => {
const [activeTab, setActiveTab] = useState("dashboard");
 const { profile, setProfile, loading ,token} = useContext(ContextAPI);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    altPhone: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone || "",
        altPhone: profile.altPhone || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSave = async () => {
  try {
   
    const res = await API.put("/customer/updateProfile", {
      name: formData.name,
      phone: formData.phone,
      altPhone: formData.altPhone,
    }, {
      headers: {
        token: token,
      },
    });

    if (res.data.success) {
      toast.success("Profile updated successfully");
      setProfile(res.data.user); // update context
      setIsEditing(false);
    }
  } catch (error) {
    console.log("Update failed:", error.message);
  }
};


  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="main">
        <aside className="profile-sidebar">
          <img src={avatar} alt="User" className="avatar" />
          <h3 className="username">{formData.name}</h3>
        <nav className="nav-buttons">
  <button onClick={() => setActiveTab("dashboard")}>🏠 Dashboard</button>
  <button onClick={() => setActiveTab("address")}>📍 Address</button>
  <button>📦 My Orders</button>
  <button>📕 Logout</button>
</nav>
        </aside>

     <main className="profile-main-content">
  <h1>{activeTab === "dashboard" ? "Dashboard" : "My Addresses"}</h1>

  {activeTab === "dashboard" && (
    !isEditing ? (
      <>
        <div className="profile-cards">
          <div className="card">
            <h3>📦 My Orders</h3>
            <p>12 Orders placed</p>
          </div>
          <div className="card">
            <h3>🏡 Addresses</h3>
            <p>2 saved addresses</p>
          </div>
        </div>
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          ✏️ Edit Profile
        </button>
      </>
    )  : (
            <div className="edit-form">
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input type="email" value={formData.email} readOnly />
              </div>

              <div className="form-group">
                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Alternative Phone:</label>
                <input
                  type="text"
                  name="altPhone"
                  value={formData.altPhone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <button onClick={handleSave}>💾 Save</button>
                <button onClick={() => setIsEditing(false)}>❌ Cancel</button>
              </div>
            </div>

            
        )
  )}

  {activeTab === "address" && (
    <AdressSection />
  )}
</main>
      </div>
    </div>
  )
}
