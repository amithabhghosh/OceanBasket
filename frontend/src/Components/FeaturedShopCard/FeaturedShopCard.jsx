import React from 'react';
import './FeaturedShopCard.css';

export const FeaturedShopCard = ({ name, id, image, place }) => {
  return (
    <div className="shop-card">
      <div className="shop-image-wrapper">
        <img src={image} alt={name} className="shop-image" />
      </div>
      <div className="shop-details">
        <h3 className="shop-name">{name}</h3>
        <p className="shop-place">{place}</p>
      </div>
    </div>
  );
};
