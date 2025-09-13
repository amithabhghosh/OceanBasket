import React, { useContext } from 'react'
import "./HomeFishesList.css"
import { ContextAPI } from '../../Context/ContextAPI'
import { getFishesByPincode } from '../../api/auth'
import { useQuery } from '@tanstack/react-query';
import { FishCard } from '../FishCard/FishCard'
import EmptySection from '../EmptySection/EmptySection';
export const HomeFishesList = ({data,isLoading,isError,shopData}) => {
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

      

if(!shopData?.pages[0]?.shops){
  return null
}
  if(!data.fishes){
return <EmptySection message={"No Fishes"}/>
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
