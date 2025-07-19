export const checkTokenExpiration = () => {
  const token = localStorage.getItem("userToken");
  if (!token) return;

  try {
    const base64Payload = token.split(".")[1];
    if (!base64Payload) throw new Error("Invalid token");

    const payload = JSON.parse(atob(base64Payload));
    const currentTime = Date.now() / 1000;

    if (payload.exp < currentTime) {
      localStorage.removeItem("userToken");
      window.location.href = "/";
    }
  } catch (err) {
    console.error("Invalid token format", err);
    localStorage.removeItem("userToken");
    window.location.href = "/";
  }
};
