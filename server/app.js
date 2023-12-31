const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");

app.use(cors());

const sequelize = require("./util/database");

const userRoute = require("./routes/user_route/userRoute");
const EmployeeRoute = require("./routes/employee_route/EmployeeRoute");

const userModel = require("./models/user_model/userModel");
const userVerificationModel = require("./models/user_model/emailVerificationModel");
const userForgotModel = require("./models/user_model/forgotModel");
const employeeModel = require("./models/employee_model/employeeModel");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRoute);
app.use("/employee",EmployeeRoute);

userModel.hasMany(userVerificationModel);
userVerificationModel.belongsTo(userModel);

userModel.hasMany(userForgotModel);
userForgotModel.belongsTo(userModel);

userModel.hasMany(employeeModel);
employeeModel.belongsTo(userModel);

sequelize.sync();

app.listen(7000, () => {
  console.log("listening on 7000");
});
