import React from 'react'
import "./LoadingSpinner.css"
import { FaSpinner } from 'react-icons/fa';
export const LoadingSpinner = () => {
  return (
       <div className="spinner-overlay">
      <FaSpinner className="spinner-icon" />
    </div>
  )
}
