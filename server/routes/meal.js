const express = require('express');
const Meal = require('../models/meal');
const mongoose = require('mongoose');

const router = express.Router();

/*
    MEAL LIST: POST /api/meal/list
    ERROR CODE:
        1: NOT LOGGED IN
*/
router.post('/list', function(req, res) {
    // Check Login Status
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // Get All Users From the Database
    Meal.find({ "username": req.session.loginInfo.username }).sort({ "date": -1, "_id": -1 }).exec((err, meals) => {
        if (err) {
            throw err;
        }
        var totalCalorie = 0;
        meals.forEach(function(meal) {
            var meal_date = new Date(meal.date);
            var curr_date = new Date();
            if (meal_date.getFullYear() == curr_date.getFullYear() && meal_date.getMonth() == curr_date.getMonth() && meal_date.getDate() == curr_date.getDate()) {
                totalCalorie += meal.calorie;
            }
        });
        return res.json({meals, totalCalorie});
    });
});

/*
    CREATE MEAL: POST /api/meal/create
    BODY EXAMPLE: { mealname: "test", calorie: "0"}
    ERROR CODE
        1: NOT LOGGED IN
*/
router.post('/create', function(req, res) {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // Create Meal
    let meal = new Meal({
        mealname: req.body.mealname,
        calorie: req.body.calorie,
        username: req.session.loginInfo.username
    });

    // Save in the Database
    meal.save(err => {
        if (err) throw err;
        return res.json({ success: true });
    });
});

/*
    UPDATE MEAL: PUT /api/meal/:id
    BODY EXAMPLE: { mealname: "test", calorie: 3000 }
    ERROR CODE
        1: INVALID ID
        2: NOT LOGGED IN
        3: NO RESOURCE
        4: PERMISSION FAILURE
*/
router.put('/:id', function(req, res) {
    // CHECK MEAL ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND MEAL BY ID
    Meal.findById(req.params.id, (err, meal) => {
        if (err) throw err;

        if (!meal) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        // IF EXISTS, CHECK USER
        if (meal.username != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 4
            });
        }

        // MODIFY AND SAVE IN DATABASE
        meal.mealname = req.body.mealname;
        meal.calorie = req.body.calorie;

        meal.save((err, meal) => {
            if (err) throw err;
            return res.json({ success: true });
        });
    });
});

/*
    DELETE MEAL: DELETE /api/meal/:id
    ERROR CODE
        1: INVALID ID
        2: NOT LOGGED IN
        3: NO RESOURCE
        4: PERMISSION FAILURE
*/
router.delete('/:id', function(req, res) {
    // CHECK MEAL ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND MEAL AND CHECK FOR AUTHOR
    Meal.findById(req.params.id, (err, meal) => {
        if(err) throw err;

        if(!meal) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }
        if(meal.username != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 4
            });
        }

        // REMOVE THE MEAL
        Meal.remove({ _id: req.params.id }, err => {
            if(err) throw err;
            res.json({ success: true });
        });
    });
});

/*
    GET MEAL: GET /api/meal/search/:id
    ERROR CODES
        1: NOT LOGGED IN
*/
router.get('/search/:id', function(req, res) {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // Find Meal By Id
    Meal.findById(req.params.id, (err, meal) => {
        if (err) throw err;
        res.json(meal);
    });
});

module.exports = router;
