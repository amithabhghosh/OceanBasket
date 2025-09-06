import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'
import { OwnerFishList } from '../OwnerComponent/OwnerFishList/OwnerFishList'
import { OwnerNavbar } from '../OwnerComponent/OwnerNavbar/OwnerNavbar'
import { getFish, getShopData } from "../api/owner"

import { useQuery } from '@tanstack/react-query';
import io from 'socket.io-client';
import { useEffect } from 'react';

const socket = io("http://localhost:5000"); // or your server URL

export const OwnerDashboard = () => {
  const ownerToken = localStorage.getItem("ownerToken");

  // ✅ Always call hooks unconditionally
  const getOwnerFish = useQuery({
    queryKey: ['getFish'],
    queryFn: () => getFish({ ownerToken }),
    keepPreviousData: true,
  });

  const {
    data: ownerData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['getOwnerData'],
    queryFn: () => getShopData({ ownerToken }),
  });

  useEffect(() => {
    if (!ownerData?.owner) return;

    socket.emit("joinShopRoom", ownerData.owner._id);
console.log("Joining room with ID:", ownerData.owner._id); 
    socket.on("new-order", (orderData) => {
      console.log("New order received:", orderData);
      if (orderData.sound) {
        const audio = new Audio("/zomato_ring_4.mp3");
        audio.play().catch((err) => {
        console.error("Audio play failed:", err);
      });
      }
      
    });

    return () => {
      socket.disconnect();
    };
  }, [ownerData?.owner?._id]);

  if (getOwnerFish.isLoading || isLoading) {
    return <LoadingSpinner />;
  }

  if (getOwnerFish.isError || isError) {
    return <p>Failed to load owner profile or fish list</p>;
  }

  return (
    <div>
      <OwnerNavbar />
      <OwnerFishList
        data={getOwnerFish.data}
        isLoading={getOwnerFish.isLoading}
        isError={getOwnerFish.isError}
      />
      

    </div>
  );
};
