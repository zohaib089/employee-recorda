const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/users');
// Routes Post api/users
// Registering a user
// Public
router.post('/', [
    check('name', 'Please Add name')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please Enter a password longer than 6 digits')
        .isLength({ min: 6 })

],
    async (req, res) => {
        // Checking for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        // getting parameters from request body
        const { name, email, password } = req.body;

        try {
            //    if user already exists
            let user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({
                    msg: 'User Already exists'
                })
            }
            //    creating a new user instance
            user = new User({
                name,
                email,
                password
            })

            // encrypting the user password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.is
                }
            }

            jwt.sign(payload, config.get('JwtSecret'), {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token })
            })

        } catch (error) {
            console.log(error.message)
            res.status(500).send('Server Error')
        }
    })



module.exports = router;