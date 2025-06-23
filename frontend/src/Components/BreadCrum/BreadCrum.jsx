import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import "./BreadCrum.css"
export const BreadCrum = () => {
    const location = useLocation()
  const paths = location.pathname.split("/").filter(Boolean);

  return (
   <div className="breadcrumb">
      {paths.map((segment, index) => {
        const to = "/" + paths.slice(0, index + 1).join("/");

      
        const name = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <span key={index}>
            <Link to={to}>{name}</Link>
            {index < paths.length - 1 && " / "}
          </span>
        );
      })}
    </div>
  )
}
