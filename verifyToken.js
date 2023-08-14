const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid!" });
    }
    req.user = user;
    next()
  });
};

module.exports = verifyToken;
