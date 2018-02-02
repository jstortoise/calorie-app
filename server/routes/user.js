const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');

const router = express.Router();

/*
    USER LOGIN: POST /api/user/login
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: LOGIN FAILED
*/
router.post('/login', function(req, res) {
    if (typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // Find the User by Username
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) throw err;

        // Check User Existance
        if (!user) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // Check If the Password is Valid
        if (!user.validateHash(req.body.password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // Set Session
        let session = req.session;
        session.loginInfo = {
            _id: user._id,
            username: user.username,
            role: user.role,
            calorie: user.calorie
        };

        // Return Success
        return res.json({
            success: true,
            loginInfo: session.loginInfo
        });
    });
});

/*
    LOGOUT: POST /api/user/logout
*/
router.post('/logout', function(req, res) {
    req.session.destroy(err => {
        if (err) throw err;
    });
    return res.json({ success: true });
});

/*
    GET ALL USER LIST: POST /api/user/list
    ERROR CODE:
        1: NOT LOGGED IN
        2: NO PERMISSION
*/
router.post('/list', function(req, res) {
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }
    if (req.session.loginInfo.role !== 1) {
        return res.status(403).json({
            error: "NO PERMISSION",
            code: 2
        });
    }

    // Get All Users From the Database
    User.find().sort({username: 1}).exec((err, users) => {
        if (err) {
            throw err;
        }
        return res.json(users);
    });
});

/*
    USER REGISTER: POST /api/user/register
    BODY: SAMPLE { "username": "test", "password": "test", "calorie": "1000" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAME EXISTS
*/

router.post('/register', function(req, res) {
    // Check Username format
    let usernameRegex = /^[a-z0-9]+$/;

    if (!usernameRegex.test(req.body.username)) {
        return res.status.json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    // Check Password Length
    // if (req.body.password.length < 4 || typeof req.body.password !== "string") {
    //     return res.status.json({
    //         error: "BAD PASSWORD",
    //         code: 2
    //     });
    // }

    // Check User Existance
    User.findOne({ username: req.body.username }, function(err, exists) {
        if (err) throw err;
        if (exists) {
            return res.status(400).json({
                error: "USERNAME EXISTS",
                code: 3
            })
        }

        // Create User
        let user = new User({
            username: req.body.username,
            password: req.body.password,
            calorie: req.body.calorie
        });

        user.password = user.generateHash(user.password);

        // Save in the Database
        user.save(err => {
            if (err) throw err;
            return res.json({ success: true });
        });
    });
});

/*
    UPDATE USER: PUT /api/user/:id
    BODY EXAMPLE: { username: "test", password: "test", calorie: 3000 }
    ERROR CODE
        1: NOT LOGGED IN
        2: NO PERMISSION(NOT ADMIN)
*/
router.put('/:id', function(req, res) {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }
    if (req.session.loginInfo.role !== 1) {
        return res.status(403).json({
            error: "NO PERMISSION",
            code: 2
        });
    }

    // FIND USER BY ID
    User.findById(req.params.id, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        // MODIFY AND SAVE IN DATABASE
        user.username = req.body.username;
        user.password = user.generateHash(req.body.password);
        user.calorie = req.body.calorie;

        user.save((err, user) => {
            if (err) throw err;
            return res.json({ success: true });
        });
    });
});

/*
    DELETE MEAL: DELETE /api/user/:id
    ERROR CODE
        1: INVALID ID
        2: NOT LOGGED IN
        3: NO RESOURCE
        4: PERMISSION FAILURE
*/
router.delete('/:id', function(req, res) {
    // CHECK MEAL ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // CHECK LOGIN STATUS
    if (req.session.loginInfo.role !== 1) {
        return res.status(403).json({
            error: "PERMISSION FAILURE",
            code: 4
        });
    }

    // FIND USER
    User.findById(req.params.id, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        if (user.username.role === 1) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 4
            });
        }

        // REMOVE THE USER
        User.remove({ _id: req.params.id }, err => {
            if(err) throw err;
            res.json({ success: true });
        });
    });
});

/*
    UPDATE SETTING: POST /api/user/setting
    BODY EXAMPLE: { calorie: 3000 }
    ERROR CODE
        1: NOT LOGGED IN
*/
router.post('/setting', function(req, res) {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    User.updateOne({
        "username": req.session.loginInfo.username
    }, {
        "calorie": req.body.calorie
    }, function(err) {
        if (err) throw err;
        return res.json({ success: true, calorie: req.body.calorie });
    });
});

/*
    GET CURRENT USER INFO GET /api/user/getInfo
*/
router.get('/getinfo', function(req, res) {
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    User.findById(req.session.loginInfo._id, (err, user) => {
        if (err) throw err;
        req.session.loginInfo.calorie = user.calorie;
        res.json({ info: req.session.loginInfo });
    });
})

/*
    SEARCH USER: GET /api/user/search/:id
*/
router.get('/search/:id', function(req, res) {
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    // FIND USER BY ID
    User.findById(req.params.id, (err, user) => {
        if (err) throw err;
        res.json(user);
    });
});

module.exports = router;
