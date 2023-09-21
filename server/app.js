const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");

const sequelize = require("./util/database");

const userRoute = require("./routes/user_route/userRoute");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRoute);

sequelize.sync();

app.listen(6666, () => {
  console.log("listening on 6666");
});
