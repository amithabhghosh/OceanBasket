import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export const AdminOrderTracking = ({ children }) => {
  const [audioAllowed, setAudioAllowed] = useState(false);

  useEffect(() => {
    // ✅ Load preference from localStorage on mount
    const savedPreference = localStorage.getItem("audioAllowed");
    if (savedPreference === "true") {
      setAudioAllowed(true);
    }

    socket.emit("joinAdminRoom");

    socket.on("admin-notification", (data) => {
      console.log("Admin received notification:", data);

      if (audioAllowed) {
        const audio = new Audio("/zomato_ring_4.mp3");
        audio.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
      }
      toast.success("New Order Recieved")
    });

    return () => {
      socket.off("admin-notification");
    };
  }, [audioAllowed]);

  
  return (
    <div>
   
      {children}
    </div>
  );
};
