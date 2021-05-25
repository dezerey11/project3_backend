require("dotenv").config();
const express = require("express");
const mongoose = require("./db/connection");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { PORT = 4000 } = process.env;
const AuthRouter = require("./controllers/user");
const auth = require("./auth");

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Routers
app.get("/", auth, (req, res) => {
  res.json(req.payload);
});
app.use("/auth", AuthRouter);

// Listener
app.listen(PORT, () => console.log(`port running on ${PORT}`));
