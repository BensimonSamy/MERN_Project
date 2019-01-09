var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const mongoURI = "mongodb://127.0.0.1:27017/mern";

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

var Users = require("./routes/Users");
var Articles = require("./routes/Articles");

app.use("/users", Users);
app.use("/articles", Articles);

app.listen(port, () => {
  console.log("server is running on port:" + port);
});
