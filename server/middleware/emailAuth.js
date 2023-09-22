const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRETKEY;

const emailAuthorization = async (req, res) => {
  try {
    const jwtUserId = req.params.userId;
    console.log(jwtUserId)
    const userId = jwt.verify(jwtUserId, jwtSecretKey);
    req.user = userId;
    res.status(200).json({ message: "user authentication sucesssfull" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = emailAuthorization;
