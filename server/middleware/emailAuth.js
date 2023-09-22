const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRETKEY;

const emailAuthorization = async (req, res,next) => {
  try {
    const jwtUserId = req.params.userId;
    const user = jwt.verify(jwtUserId, jwtSecretKey);
    req.user = user;
    next()
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  emailAuthorization: emailAuthorization,
};
