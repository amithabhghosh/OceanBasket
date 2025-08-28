import React, { useContext, useEffect, useState } from 'react'
import "./FishDetails.css"
import { ContextAPI } from '../../Context/ContextAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { addtoCart, getFishByFishId, getShopsByFishId, getTimeOfClosing } from '../../api/auth';
import { useMutation } from '@tanstack/react-query';
import { ShopCardRelated } from '../ShopCardRelated/ShopCardRelated';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export const FishDetails = () => {
   const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate()
  const token = localStorage.getItem("userToken");
    const lat = localStorage.getItem("lat")
    const lng = localStorage.getItem("lng")
       const {fishId} = useParams()
    const [quantity,setQuantity] = useState(.5)
    const [totalAmount,setTotalAmount] = useState(0)
    const [switchShop,setSwitchShop] = useState(false)
      const {
        data:fishData,
        isLoading:fishLoading,
        isError:fishError
   
      } = useQuery({
        queryKey: ['fishesByFishId',lat,lng,fishId],
        queryFn: () => getFishByFishId({fishId}),
        keepPreviousData: true,
      });

   const {
        data:shopData,
        isLoading:shopLoading,
        isError:shopError,
        
      } = useQuery({
        queryKey: ['shopsByFishId', lat,lng,fishId],
        queryFn: () => getShopsByFishId({fishId,lat,lng}),
        keepPreviousData: true,
        enabled: switchShop
      });

      // const getTime = useQuery({
      //   queryKey: ['getTime'],
      //   queryFn: () => getFishByFishId({shopId:fishData.ownerDetails._id}),
      //   keepPreviousData: true,
      // });


const checkStatus = async () => {
  try {
    const res = await getTimeOfClosing({shopId:fishData.ownerDetails._id});
    setIsBlocked(res.isBlocked);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
  if (fishData?.ownerDetails?._id) {
    checkStatus();
    const interval = setInterval(checkStatus, 6000); // every 1 min
    return () => clearInterval(interval);
  }
}, [fishData]);


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
   const errorMessage =
    err.response?.data?.message || 
    err.message ||                 
    "Something went wrong";        

  toast.error(errorMessage);
  console.log(errorMessage);
  
  },
});

  if (fishLoading) return <LoadingSpinner/>
  if (fishError || fishData?.success === false) return <p >{fishData?.message || "Error fetching fishes"}</p>;



  return (
    <>
    <div className='FishDetails'>
<div className="fishDetailTopSection">
 <p onClick={() => navigate(-1)}><ion-icon name="arrow-back-outline" ></ion-icon> Back</p>
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
  <div className="fishMidSectionTypeAndAvailability">
    {isBlocked ? (
<h4>Out of Stock</h4>
    ) : (
<h4>Type:{fishData?.fishDetails?.type || null}</h4>
    ) }
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
    disabled={buttonLoading || isBlocked}
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

 {switchShop &&  (
  <div className='switchShopBox'>
{!shopData?.matchingShops ? <p>The Fish Available only in this Shop</p> : (
 shopData.matchingShops.map((shop) => {
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
    })
)}

   
  </div>
)}


    </div>


    </>
  )
}
