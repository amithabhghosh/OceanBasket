const jwt = require("jsonwebtoken");
require("dotenv").config() 
const generateNewToken = async  (req,res)=>{
      const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  // Verify refresh token
  jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    // Create new access token
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" } // short-lived token
    );

    res.json({ accessToken });
  });
}

module.exports = {generateNewToken}