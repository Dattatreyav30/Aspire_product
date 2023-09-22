const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());

const sequelize = require("./util/database");

const userRoute = require("./routes/user_route/userRoute");

const userModel = require("./models/user_model/userModel");
const userVerificationModel = require("./models/user_model/emailVerificationModel");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRoute);

userModel.hasMany(userVerificationModel);
userVerificationModel.belongsTo(userModel);

sequelize.sync();

app.listen(7000, () => {
  console.log("listening on 7000");
});
