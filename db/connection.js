require("dotenv").config();
const { MONGODB_URL } = process.env;
const mongoose = require("mongoose");
//connect
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
};

//MAKING THE DATABASE CONNECTION
mongoose.connect(MONGODB_URL, config)

//messages
mongoose.connection
  .on("open", () => console.log("connected to mongo"))
  .on("close", () => console.log("disconnected to mongo"))
  .on("error", (error) => console.log(error));

module.exports = mongoose;
