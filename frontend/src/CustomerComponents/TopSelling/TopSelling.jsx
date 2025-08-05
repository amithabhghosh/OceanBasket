import React from 'react'
import "./TopSelling.css"
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react'
import { ContextAPI } from '../../Context/ContextAPI'
import { useState } from 'react'
import { getFishWithHighRating } from '../../api/auth'
import { useNavigate } from 'react-router-dom';
export const TopSelling = ({data,isLoading,isError}) => {
  const {zipCode,setZipCode} = useContext(ContextAPI)
   const [skip, setSkip] = useState(0);
  const [seeAllClicked, setSeeAllClicked] = useState(false);
const navigate = useNavigate()
  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useQuery({
  //   queryKey: ['topRatedFishes', zipCode, skip],
  //   queryFn: () => getFishWithHighRating({ zipCode, skip }),
  //   keepPreviousData: true,
  // });

  // const handleSeeAll = () => {
  //   setSkip(5); 
  //   setSeeAllClicked(true);
  // };


  if (isError || data?.success === false) return <p>{data?.message || "Error fetching fishes"}</p>;

  const fishList = data?.uniqueFishes || [];

  return (
    <div className='TopSelling'>
<div className="topSellingTopSection">
  <p>Top Selling Items</p>

   {/* {!seeAllClicked && fishList.length >= 5 && (
      <p onClick={handleSeeAll} className='seeAllButtonTopFishes'>See All<ion-icon name="arrow-forward-outline"></ion-icon></p>  
      )}
   */}
</div>
<div className="topSellingDownSection">
{fishList.map((fish) => {
  const englishName = fish.name.split('/')[1]||fish.name // get only the English name
  return (
    <div
      key={fish.name}
      className='topSellingFishCard'
      onClick={() => navigate(`/Name/${englishName}`)}
    >
      <div className="topSellingFishCardImage">
        <img src={fish.image} alt={englishName} />
      </div>
      <p>{fish.name}</p> {/* Still showing full name (Malayalam/English) */}
    </div>
  );
  
})}

{/* {!seeAllClicked && fishList.length >= 5 && (
      <p onClick={handleSeeAll} className='seeAllButtonTopFishesMobile'>See All<ion-icon name="arrow-forward-outline"></ion-icon></p>  
      )} */}

</div>
    </div>
  )
}
