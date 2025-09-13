import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../api/auth';
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner';
import { isTokenExpired } from '../utils/isTokenExpired';
import { toast } from 'react-toastify';

export const OwnerAuth = ({children}) => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  const token = localStorage.getItem("ownerToken");
  const refreshToken = localStorage.getItem("ownerRefreshToken");

  const { mutateAsync: refreshTokenMutate } = useMutation({
    mutationFn: refreshAccessToken, // expects { refreshToken }
  });

  useEffect(() => {
    const checkAuth = async () => {
      if (!token || !refreshToken) {
        toast.error("Please Login")
        navigate("/ownerSignUp");
        return;
      }

      // ✅ If access token is expired
      if (isTokenExpired(token)) {
        try {
          const newToken = await refreshTokenMutate({ refreshToken });

          // save new token
          localStorage.setItem("ownerToken", newToken.accessToken);

          setAuthChecked(true);
        } catch (err) {
          console.error("Refresh failed:", err);
          // if refresh also failed
          localStorage.removeItem("ownerToken");
          localStorage.removeItem("ownerRefreshToken");
          toast.error("Please Login")
          navigate("/ownerSignUp");
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
