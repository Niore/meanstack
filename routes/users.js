const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

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
router.post('/auth', (req, res, next) => {
    const uname = req.body.username;
    const pw = req.body.password;

    User.getUserByUsername(uname, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json(401, {success: false, msg: ''});
        }

        User.comparePassword(pw, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success:false, msg:'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

// Validation
router.get('/validate', (req, res, next) => {
    res.send('Validate');
});

module.exports = router;