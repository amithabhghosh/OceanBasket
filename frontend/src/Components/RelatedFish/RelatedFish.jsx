import React, { useContext, useEffect, useRef, useState } from 'react';
import './RelatedFish.css';
import { useParams } from 'react-router-dom';
import { ContextAPI } from '../../Context/ContextAPI';
import { DealCard } from '../DealCard/DealCard';

export const RelatedFish = () => {
  const { id } = useParams();
  const { fishes } = useContext(ContextAPI);
  const [category, setCategory] = useState('');
  const scrollRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const fish = fishes.find((item) => item.id.toString() === id);

  useEffect(() => {
    if (fish) setCategory(fish.category);
  }, [fish]);

  const relatedFishes = fishes.filter(
    (item) => item.category === category && item.id.toString() !== id
  );

  useEffect(() => {
    const checkScroll = () => {
      const container = scrollRef.current;
      if (container && container.scrollWidth > container.clientWidth) {
        setShowScrollButtons(true);
      } else {
        setShowScrollButtons(false);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [relatedFishes]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="RelatedFish">
      <div className="relatedFishHead">
        <h3>Related Fish</h3>
      </div>

      {showScrollButtons && (
        <div className="scroll-buttons">
          <button className="scroll-btn" onClick={scrollLeft}>&#8592;</button>
          <button className="scroll-btn" onClick={scrollRight}>&#8594;</button>
        </div>
      )}

      <div className="relatedFishesList" ref={scrollRef}>
        {relatedFishes.length > 0 ? (
          relatedFishes.map((fish) => (
            <DealCard
              key={fish.id}
              id={fish.id}
              name={fish.name}
              price={fish.price}
              quantity={fish.quantity}
              off={fish.off}
              image={fish.image}
              deal={fish.deal}
            />
          ))
        ) : (
          <p style={{ padding: '1rem', textAlign: 'center' }}>
            No related fish found.
          </p>
        )}
      </div>
    </div>
  );
};

