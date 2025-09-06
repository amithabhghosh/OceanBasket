import React from 'react'
import { OwnerNavbar } from '../OwnerComponent/OwnerNavbar/OwnerNavbar'
import { OwnerOrderCard } from '../OwnerComponent/OwnerOrderCard/OwnerOrderCard'
import { useQuery } from '@tanstack/react-query';
import { getOrdersByOwner } from '../api/owner';
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../CustomerComponents/Footer/Footer';
export const OrderList = () => {
    const navigate = useNavigate()
const ownerToken = localStorage.getItem("ownerToken")
    const getOrdersByShop = useQuery({
          queryKey: ['getOrderByShop'],
          queryFn: () => getOrdersByOwner({ownerToken}),
          keepPreviousData: true,
        });

        if(getOrdersByShop.isLoading){
            return <LoadingSpinner/>
        }

        if(getOrdersByShop.isError){
            return navigate("/ownerSignup")
        }
  return (
    <div >
         <OwnerNavbar />
         <div style={{marginTop:"100px", minHeight:"300px"}}>
 <OwnerOrderCard data = {getOrdersByShop.data} refetch = {getOrdersByShop.refetch} />
         </div>
        <Footer/>
    </div>
  )
}
