import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { getShopData } from '../api/owner';
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner';

const socket = io("http://localhost:5000", {
  withCredentials: true,
});
export const OwnerOrderTracking = ({children}) => {
  const [ownerAudioAllowed, setOwnerAudioAllowed] = useState(false);
const ownerToken = localStorage.getItem("ownerToken");
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

  const savedPreference = localStorage.getItem("ownerAudioAllowed");
    if (savedPreference === "true") {
       setOwnerAudioAllowed(true);
    }


    socket.emit("joinShopRoom", ownerData?.owner?._id);

    socket.on("new-order", (orderData) => {

      if (orderData?.sound && ownerAudioAllowed) {
        const audio = new Audio("/zomato_ring_4.mp3");
        audio.play().catch((err) => {
        console.log("Audio play failed:", err);
      });
      }
        toast.success("New Order Recieved")
    });

    return () => {
      socket.disconnect();
    };
  }, [ownerData?.owner?._id,ownerAudioAllowed]);

  if(isLoading){
    return <LoadingSpinner/>
  }
  return (
    <div>
{children}
    </div>
  )
}
