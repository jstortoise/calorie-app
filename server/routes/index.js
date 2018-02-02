const express = require('express');
const user = require('./user');
const meal = require('./meal');

const router = express.Router();

router.use('/*', function(req, res, next) {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");

    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

router.use('/user', user);
router.use('/meal', meal);

module.exports = router;
