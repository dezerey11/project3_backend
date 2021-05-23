require("dotenv").config();

// EXPRESS
const express = require("express");
const app = express();

// MIDDLEWARE
const morgan = require("morgan");
const cors = require("cors");
const { PORT = 4000 } = process.env;

// using middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// MONGOOSE
const mongoose = require("./db/connection");
const Workout = require("./models/Workout1");

// ROUTES
app.get("/", (req, res) => res.send("hello MARIALAINA"));

//index
app.get("/workout", async (req, res) => {
    try {
        res.json(await Workout.find({}));
    } catch (error){
        res.status(400).json(error);
    }

});
// workout create route
app.post("/workout", async (req, res) => {
    try {
        res.json(await Workout.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});
// workout update
app.put("/workout/:id", async (req, res) => {
    try {
        res.json(
            await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true})
        )
    } catch (error) {
        res.status(400).json(error);
    }
});
// workout delete
app.delete("/workout/:id", async (req, res) => {
    try {
        res.json(await Workout.findByIdAndRemove(req.params.id))
    } catch (error){
        res.status(400).json(error); 
    }
})

app.listen(PORT, () => console.log(`port running on ${PORT}`));
