const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require("bcryptjs");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const config = require('../../config/config.js');
const BoxSDK = require('box-node-sdk');
const sdk = BoxSDK.getPreconfiguredInstance(config);
const client = sdk.getAppAuthClient('enterprise');

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    folderId: req.user.folderId
  });
})

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ username: req.body.username })
    .then(user => {
        if (user) {
            return res.status(400).json({username: "Account already associated with Online ID"})
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            })
            //create password digest for user for jwt strategy
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            //when user is created, a folder with their name and id is created
                            const folderId = `${user.lastName}, ${user.firstName}_${user.id}`
                            client.folders.create('0', folderId)
                                .then(res2 => {
                                    newUser.folderId = res2.id;
                                    newUser.save()
                                        .then(res3 => {
                                            const payload = { 
                                                id: user.id, 
                                                username: user.username, 
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                folderId: user.folderId
                                            };
                                            //key expires in 1 hour
                                            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                                res.json({
                                                    success: true,
                                                    token: "Bearer " + token
                                                });
                                            });
                                        })
                                })
                        })
                        .catch(err => console.log(err))
                })
            })
        }  
    })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
     
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ username: "This user does not exist."});
            }
            
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { 
                            id: user.id, 
                            username: user.username, 
                            firstName: user.firstName,
                            lastName: user.lastName,
                            folderId: user.folderId
                        };

                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                    } else {
                        errors.password = "Incorrect password";
                        return res.status(400).json(errors);
                    }
                })
                .catch(err => console.log(err));
        });
});

module.exports = router;