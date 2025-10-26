import React from "react";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "./CustomerComponents/LoadingSpinner/LoadingSpinner";

// const getLocation = () => {
//   return new Promise((resolve, reject) => {
//     const lat = localStorage.getItem("lat");
//     const lng = localStorage.getItem("lng");

//     if (lat && lng) {
//       resolve({ lat, lng });
//     } else if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;

//           localStorage.setItem("lat", lat);
//           localStorage.setItem("lng", lng);

//           resolve({ lat, lng });
//         },
//         (err) => {
//           reject(new Error("Unable to fetch location. Please allow location access."));
//         }
//       );
//     } else {
//       reject(new Error("Geolocation not supported by this browser."));
//     }
//   });
// };



const getLocation = () => {
  return new Promise((resolve, reject) => {
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");

    if (lat && lng) {
      resolve({ lat: parseFloat(lat), lng: parseFloat(lng) });
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          localStorage.setItem("lat", lat);
          localStorage.setItem("lng", lng);

          resolve({ lat, lng });
        },
        (err) => {
          reject(
            new Error(
              "Unable to fetch location. Please allow location access."
            )
          );
        },
        {
          enableHighAccuracy: true, // ✅ Request GPS-based location
          timeout: 10000,           // ⏳ Maximum wait time (10s)
          maximumAge: 0             // 🚫 Don't use cached location
        }
      );
    } else {
      reject(new Error("Geolocation not supported by this browser."));
    }
  });
};


export const LocationManager = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userLocation"],
    queryFn: getLocation,
    staleTime: Infinity, // never refetch unless manually triggered
    cacheTime: Infinity, // keep cached forever
  });

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return null;
  }


  return <>{children}</>;
};
