require("dotenv").config();

// EXPRESS
const express = require("express");
const app = express();

// MIDDLEWARE
const morgan = require("morgan");
const cors = require("cors");
const { PORT = 4000 } = process.env;
const AuthRouter = require("./controllers/user");
const auth = require("./auth");

// using middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// MONGOOSE
const mongoose = require("./db/connection");
const { User, Workout } = require("./models/User");

// ROUTES

//index
app.get("/workouts", auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.payload.username });
    res.json(user.workouts);
  } catch (error) {
    res.status(400).json(error);
  }
});
// workout create route
app.post("/workouts", auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.payload.username });
    const workout = await Workout.create(req.body);
    user.workouts.push(workout);
    await user.save();
    res.json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// workout update
app.put("/workouts/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.payload.username });
    // look for index workout is on
    const workoutIndex = user.workouts.findIndex(
      (workout) => workout._id.toString() === req.params.id
    );

    // findIndex returns -1 when it can not find the workout
    if (workoutIndex !== -1) {
      // if it does find an index
      const workout = await Workout.create(req.body);
      user.workouts[workoutIndex] = workout;
      await user.save();
      res.json(workout);
    } else {
      // if it does not find an index
      res.status(400).json({ message: "CAN NOT FIND WORKOUT" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// workout delete
app.delete("/workouts/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.payload.username });
    // look for index workout is on
    const workoutIndex = user.workouts.findIndex(
      (workout) => workout._id.toString() === req.params.id
    );

    // findIndex returns -1 when it can not find the workout
    if (workoutIndex !== -1) {
      // if it does find an index
      user.workouts.splice(workoutIndex, 1);
      await user.save();
      res.status(204).send();
    } else {
      // if it does not find an index
      res.status(400).json({ message: "CAN NOT FIND WORKOUT" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Routers
app.get("/", auth, (req, res) => {
  res.json(req.payload);
});
app.use("/auth", AuthRouter);

// Listener
app.listen(PORT, () => console.log(`port running on ${PORT}`));
