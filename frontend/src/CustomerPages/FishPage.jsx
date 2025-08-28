import React, { useContext } from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import {SeperateFishSection} from "../CustomerComponents/SeperateFishSection/SeperateFishSection"
import { Footer } from '../CustomerComponents/Footer/Footer'
import { getFishesByName } from '../api/auth'
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'
import { ContextAPI } from '../Context/ContextAPI'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
export const FishPage = () => {
  const {fishName} = useParams()
const lat = localStorage.getItem("lat")
const lng = localStorage.getItem("lng")
   const {
        data,
        isLoading,
        isError
        
      } = useQuery({
        queryKey: ['getFishByName', lng,lat],
        queryFn: () => getFishesByName({lat,lng,fishName}),
        keepPreviousData: true,
      });
      
    
  return (
    <div>
        <Navbar />
      
      <div style={{ minHeight: '50vh' }}> {/* Prevents Footer from jumping up */}
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <LoadingSpinner />
          </div>
        ) : (
          <SeperateFishSection data={data} isError={isError} />
        )}
      </div>

      <Footer />
    </div>
  )
}
