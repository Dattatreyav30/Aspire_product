const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRETKEY;

const userAuth = async (req, res, next) => {
  try {
    const jwtUserId = req.headers.token;
    const user = jwt.verify(jwtUserId, jwtSecretKey);
    req.user = user;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "internal server error/error while authorization" });
  }
};

module.exports = userAuth;
