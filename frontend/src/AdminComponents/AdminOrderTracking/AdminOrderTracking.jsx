import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export const AdminOrderTracking = ({ children }) => {
  const [audioAllowed, setAudioAllowed] = useState(false);

  useEffect(() => {
    socket.emit("joinAdminRoom");

    socket.on("admin-notification", (data) => {
      console.log("Admin received notification:", data);
     
      if (audioAllowed) {
        const audio = new Audio("/zomato_ring_4.mp3");
        audio.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
      }
    });

    return () => {
      socket.off("admin-notification");
    };
  }, [audioAllowed]);

  return (
    <div>
      {!audioAllowed && (
        <button onClick={() => setAudioAllowed(true)}>
          Enable Sound Alerts
        </button>
      )}
      {children}
    </div>
  );
};
