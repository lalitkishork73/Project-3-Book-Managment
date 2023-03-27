//<======================== Main Application ========================>//
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const testPort = 3001;
const multer = require("multer");
const cors = require("cors");
const favicon = require('serve-favicon');

// console.log(path.join(__dirname,'../../','/client','/build') )
app.use(favicon(path.join(__dirname, '../../', '/client', '/public/favicon.ico')));
app.use(express.static(path.join(__dirname, '../../', '/client', '/build')))
// console.log(path.join(__dirname, '../../', '/client', '/public/favicon.ico'))
app.use(bodyParser.json())
app.use(multer().any())
app.use(cors());

mongoose
  .connect(
    process.env.MONGO_AUTH,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);


// Avoiding Refresh Error for static react app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../', '/client', '/build','index.html'));
});


app.listen(process.env.PORT || testPort, function () {
  console.log("Express app running on port " + (process.env.PORT || testPort));
});
