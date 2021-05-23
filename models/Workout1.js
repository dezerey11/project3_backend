//CONNECTING TO MY MODEL DATABASE
require("dotenv").config();

const {Schema, model} = require("../db/connection")

//CREATING MY WORKOUT SCHEMA
const WorkoutSchema = new Schema({
    title: String,
    text: String,
    date: String
});

const Workout = model('Workout', WorkoutSchema);


module.exports = Workout;
