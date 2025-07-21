import React, { useState } from 'react'
import "./PincodePopup.css"
import { toast } from 'react-toastify';
export const PincodePopup = ({ onSubmit }) => {
    const [pincode, setPincode] = useState('');
      const handleSubmit = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      onSubmit(pincode);
    } else {
      toast.error("Enter Valid Pincode")
    }
  };
  return (
    <div className="popup-overlay">
      <form className="popup-content" onSubmit={handleSubmit}>
        <h2>Enter your pincode</h2>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter pincode"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
