const jwt = require("jsonwebtoken");

const getAuthentication = (req, res, next) => {
  const token = req.header("token");

  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified; // Attach decoded token { id: ... }
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = {getAuthentication};
