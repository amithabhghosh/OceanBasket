import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isTokenExpired } from '../utils/isTokenExpired';
import { refreshAccessToken } from '../api/auth';
import { useMutation } from '@tanstack/react-query';
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner';

export const CustomerAuth = ({children}) => {
 const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  const token = localStorage.getItem("userToken");
  const refreshToken = localStorage.getItem("userRefreshToken");

  const { mutateAsync: refreshTokenMutate } = useMutation({
    mutationFn: refreshAccessToken, // expects { refreshToken }
  });

  useEffect(() => {
    const checkAuth = async () => {
      if (!token || !refreshToken) {
        navigate("/");
        return;
      }

      // ✅ If access token is expired
      if (isTokenExpired(token)) {
        try {
          const newToken = await refreshTokenMutate({ refreshToken });

          // save new token
          localStorage.setItem("userToken", newToken.accessToken);

          setAuthChecked(true);
        } catch (err) {
          console.error("Refresh failed:", err);
          // if refresh also failed
          localStorage.removeItem("userToken");
          localStorage.removeItem("userRefreshToken");
          navigate("/");
        }
      } else {
        // token still valid
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [token, refreshToken, navigate, refreshTokenMutate]);

  if (!authChecked) {
    return <LoadingSpinner/>; // optional spinner
  }

  return <>{children}</>;
}
