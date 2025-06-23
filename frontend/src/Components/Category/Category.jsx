import React, { useContext } from 'react'
import './Category.css'
import { useParams } from 'react-router-dom'
import { ContextAPI } from '../../Context/ContextAPI'
import { DealCard } from '../DealCard/DealCard'

export const Category = () => {
    const { category } = useParams()
    const { fishes } = useContext(ContextAPI)

    const categoryMap = {
        BonyFish: { key: 'Bony', label: 'Bony Fish' },
        Cartilaginous: { key: 'Cart', label: 'Cartilaginous Fish' },
        FreshWaterFish: { key: 'Freshwater', label: 'Freshwater Fish' },
        SaltWaterFish: { key: 'Salt', label: 'Saltwater Fish' },
        OilyFish: { key: 'Oily', label: 'Oily Fish' },
    }

    const selectedCategory = categoryMap[category]
    const filteredFishes = fishes.filter(fish => fish.category === selectedCategory?.key)

    return (
        <div className="categoryFish">
            <h2 className="categoryTitle">{selectedCategory?.label || 'Fish Category'}</h2>
            <div className="catagoryFishList">
                {filteredFishes.length > 0 ? (
                    filteredFishes.map(fish => (
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
                    <p className="noItemsText">No items found in this category.</p>
                )}
            </div>
        </div>
    )
}

