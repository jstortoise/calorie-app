const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Meal = new Schema({
    mealname: String,
    calorie: Number,
    username: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('meal', Meal);
