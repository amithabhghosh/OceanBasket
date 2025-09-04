import React from "react";
import { FiInbox } from "react-icons/fi"; // using react-icons
import "./EmptySection.css"
const EmptySection = ({ message}) => {
  return (
    <div className="empty-section">
      <FiInbox className="empty-icon" />
      <p className="empty-text">{message}</p>
    </div>
  );
};

export default EmptySection;
