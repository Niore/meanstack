const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// model
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.addUser(user, (err, user) => {
        if(err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg:'User registred'});
        }
    });
});

// Authenticate
router.get('/auth', (req, res, next) => {
    res.send('Authenticate');
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('Profile');
});

// Validation
router.get('/validate', (req, res, next) => {
    res.send('Validate');
});

module.exports = router;