require("dotenv").config();

const {Schema, model} = require("../db/connection")

const WorkoutSchema = new Schema({
    title: String,
    text: String,
    date: String 
})
//User Schema
const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    workouts: [WorkoutSchema] 
}, {timestamps: true})
//User Model
const User = mongoose.model("User", UserSchema)

module.exports = User;