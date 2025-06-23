import React, { useEffect, useState } from 'react'
import "./Banner.css"
import slide3 from "../../assets/images/slider 3.webp"
import slide1 from "../../assets/images/slider 2.webp"
import slide2 from "../../assets/images/40d223a31fe0ac49.webp"
const images = [
slide1,slide2,slide3
] 

export const Banner = () => {
      const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer); 
  }, [current]);

  return (
    <div>
        <div className="carousel">
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <div className="carousel-inner">
       {images.map((img, index) => (
  <div
    className={index === current ? "carousel-item active" : "carousel-item"}
    key={index}
  >
    <img src={img} alt={`Slide ${index}`} />
  </div>
))}

      </div>
      <button className="next" onClick={nextSlide}>&#10095;</button>
    </div> 
    </div>
  )
}
