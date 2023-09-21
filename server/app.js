const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");

const sequelize = require("./util/database")

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

sequelize.sync();
 
app.listen(6666, () => {
  console.log("listening on 6666");
});
