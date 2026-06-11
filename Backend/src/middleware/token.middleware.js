
const jwtoken = require("jsonwebtoken");

const ensureAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "jwt Token is reuired",
      success: false,
    });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid JWT Token",
    });
  }
};

module.exports = ensureAuthentication;
