const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRETKEY

const generateAccessToken = (id) =>{
    return jwt.sign({ jwtUserToken: id }, jwtSecretKey);
}
module.exports = {
    generateAccessToken
}