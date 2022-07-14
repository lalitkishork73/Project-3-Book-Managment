//<======================== Main Application ========================>//

const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const mongoose = require("mongoose");
const app = express();
const testPort = 3000;
const multer = require("multer");

app.use(bodyParser.json());
app.use(multer().any())

mongoose
  .connect(
    "mongodb+srv://lalitkishork73:UzPr9bb6Wvxda9eC@cluster0.o2wavxe.mongodb.net/group31Database?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);
app.use("*", (req,res)=>{
  res.status(404).send({ status: false, message: "Please Enter Valid URL"});
});

app.listen(process.env.PORT || testPort, function () {
  console.log("Express app running on port " + (process.env.PORT || testPort));
});
