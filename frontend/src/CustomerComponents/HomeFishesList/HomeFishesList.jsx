import React, { useContext } from 'react'
import "./HomeFishesList.css"
import { ContextAPI } from '../../Context/ContextAPI'
import { getFishesByPincode } from '../../api/auth'
import { useQuery } from '@tanstack/react-query';
import { FishCard } from '../FishCard/FishCard'
export const HomeFishesList = ({data,isLoading,isError}) => {
    const {zipCode,setZipCode} = useContext(ContextAPI)
    //  const {
    //     data,
    //     isLoading,
    //     isError,
    //     refetch,
    //   } = useQuery({
    //     queryKey: ['fishListByPincode', zipCode],
    //     queryFn: () => getFishesByPincode({ zipCode }),
    //     keepPreviousData: true,
    //   });

      


  if(!data.fishes){
return null
  }
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
