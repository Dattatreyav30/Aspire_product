const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(6666, () => {
  console.log("listening on 6666");
});
