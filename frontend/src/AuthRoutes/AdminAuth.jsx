import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../api/auth';
import { useMutation } from '@tanstack/react-query';
import { isTokenExpired } from '../utils/isTokenExpired';
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';

export const AdminAuth = ({children}) => {
 const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  const token = localStorage.getItem("adminToken");
  const refreshToken = localStorage.getItem("adminRefreshToken");

  const { mutateAsync: refreshTokenMutate } = useMutation({
    mutationFn: refreshAccessToken, // expects { refreshToken }
  });

  useEffect(() => {
    const checkAuth = async () => {
      if (!token || !refreshToken) {
        toast.error("Please Login")
        navigate("/admin/login");
        return;
      }

      // ✅ If access token is expired
      if (isTokenExpired(token)) {
        try {
          const newToken = await refreshTokenMutate({ refreshToken });

          // save new token
          localStorage.setItem("adminToken", newToken.accessToken);

          setAuthChecked(true);
        } catch (err) {
          console.error("Refresh failed:", err);
          // if refresh also failed
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminRefreshToken");
          toast.error("Please Login")
          navigate("/admin/login");
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
