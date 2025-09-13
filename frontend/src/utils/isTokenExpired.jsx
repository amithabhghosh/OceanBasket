// utils/auth.js
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
    const exp = decoded.exp * 1000; // exp is in seconds → convert to ms
    return Date.now() >= exp;
  } catch (err) {
    return true; // if decoding fails, treat as expired
  }
};
