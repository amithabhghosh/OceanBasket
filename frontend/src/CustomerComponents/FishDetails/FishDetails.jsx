import React, { useContext, useEffect, useState } from 'react'
import "./FishDetails.css"
import { ContextAPI } from '../../Context/ContextAPI';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { addtoCart, getFishByFishId, getShopsByFishId } from '../../api/auth';
import { useMutation } from '@tanstack/react-query';
import { ShopCardRelated } from '../ShopCardRelated/ShopCardRelated';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const FishDetails = () => {
  const token = localStorage.getItem("userToken");
    const {zipCode,setZipCode} = useContext(ContextAPI)
       const {fishId} = useParams()
    const [quantity,setQuantity] = useState(.5)
    const [totalAmount,setTotalAmount] = useState(0)
    const [switchShop,setSwitchShop] = useState(false)
      const {
        data:fishData,
        isLoading:fishLoading,
        isError:fishError
   
      } = useQuery({
        queryKey: ['fishesByFishId', zipCode,fishId],
        queryFn: () => getFishByFishId({fishId}),
        keepPreviousData: true,
      });

   const {
        data:shopData,
        isLoading:shopLoading,
        isError:shopError,
        
      } = useQuery({
        queryKey: ['shopsByFishId', zipCode,fishId],
        queryFn: () => getShopsByFishId({fishId,zipCode}),
        keepPreviousData: true,
        enabled: switchShop
      });


      useEffect(() => {
    if (fishData?.fishDetails?.pricePerKg) {
      const perKgPrice = fishData.fishDetails.pricePerKg;
      const amount = (perKgPrice * quantity).toFixed(2);
      setTotalAmount(amount);
    }
  }, [quantity, fishData]);

  const handleIncrement = () => {
    setQuantity(prev => +(prev + 0.5).toFixed(1));
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(0.5, +(prev - 0.5).toFixed(1)));
  };


const { mutate: handleAddToCart, isLoading:buttonLoading, isError, error } = useMutation({
  mutationFn: (cartData) => addtoCart({ ...cartData, token }),
  onSuccess: (data) => {
    console.log('Added to cart:', data);
    toast.success("Item Added")
   
  },
  onError: (err) => {
    
    const message = err?.response?.data?.message || err.message || "Something went wrong";
  toast.error(message);
  },
});

  if (fishLoading) return <p className='loadingError'>Loading...</p>;
  if (fishError || fishData?.success === false) return <p >{fishData?.message || "Error fetching fishes"}</p>;



  return (
    <>
    <div className='FishDetails'>
<div className="fishDetailTopSection">
 <p><ion-icon name="arrow-back-outline" ></ion-icon> Back</p>
</div>
<div className="fishDetailMidSection">

<div className="fishDetailSectionImage">
    <img src={fishData.fishDetails.image} alt="Fish Image" />
</div>
<div className="fishMidSectionFullDetails">
  <div className="fishMidSectionHeadings">
  <h3>{fishData.fishDetails.name}</h3>
    <h4 className='fishMidSectionPriceDetails'>₹{fishData.fishDetails.pricePerKg/2}<span> /500g</span></h4>
  </div>
  
    <div className="fishMidSectionQuantityDetails">
        <div className="fishMidQuantity">
            <p onClick={handleDecrement}>-</p>
            <span>{quantity} Kg</span>
            <p onClick={handleIncrement}>+</p>
        </div>
        <div className="fishMidItemTotalSection">
            <p>Item Total: <span>₹{totalAmount}</span></p>
        </div>
    </div>
    <div className="fishMidSectionAddtoCarts">
      <button className='fishMidSectionAddToCartBtn' onClick={()=>handleAddToCart({
      productId: fishData.fishDetails._id,
      quantity: quantity,
      shopId: fishData.ownerDetails._id,
    })}
    disabled={buttonLoading}
    >{buttonLoading?( <FaSpinner className="spin" />):"Add to Cart" }</button>
      <div className="fishMidShopSelectSection">
        <ion-icon name="storefront-outline" ></ion-icon>
        <p>{fishData?.ownerDetails?.shopName}</p>
        <button onClick={()=>setSwitchShop(prev=>!prev)}>Switch Shop</button>
      </div>
    </div>
</div>
</div>
<div className="fishDetailDownSection">
<p>{fishData.fishDetails.description}</p>
</div>

 {switchShop && shopData?.matchingShops && (
  <div className='switchShopBox'>
    {shopData.matchingShops.map((shop) => {
      const matchingFish = shopData.fishesWithOwner.find(
        (fish) => fish.owner === shop._id
      );

      return (
        <ShopCardRelated
          key={shop._id}
          id={shop._id}
          shopName={shop.shopName}
          delivery={shop.deliveryRadiusInKm}
          image={shop.shopImage}
          fishOwnerId={matchingFish?._id}  
        />
      );
    })}
  </div>
)}


    </div>


    </>
  )
}
