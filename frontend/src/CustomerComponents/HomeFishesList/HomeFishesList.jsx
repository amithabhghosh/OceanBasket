import React, { useContext } from 'react'
import "./HomeFishesList.css"
import { ContextAPI } from '../../Context/ContextAPI'
import { getFishesByPincode } from '../../api/auth'
import { useQuery } from '@tanstack/react-query';
import { FishCard } from '../FishCard/FishCard'
export const HomeFishesList = () => {
    const {zipCode,setZipCode} = useContext(ContextAPI)
     const {
        data,
        isLoading,
        isError,
        refetch,
      } = useQuery({
        queryKey: ['fishListByPincode', zipCode],
        queryFn: () => getFishesByPincode({ zipCode }),
        keepPreviousData: true,
      });

       if (isLoading) return <p>Loading...</p>;
  if (isError || data?.success === false) return <p>{data?.message || "Error fetching fishes"}</p>;

  const fishList = data?.fishes || [];
console.log(fishList)
  return (

    <div className='HomeFishesList'>
{fishList.map((item)=>(

    <FishCard image={item.image} name={item.name} price={item.pricePerKg} id={item._id}/>
))}
    </div>
  )
}
