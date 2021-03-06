const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const config = require('config');

const User = require('../models/users');

// Routes Get api/auth
// Getting a logged in User
// private
router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        console.log('User', user)
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// Routes Post api/auth
// Authenticate USer and get token
// public
router.post('/', [
    check('email', "Please include a valid email").isEmail(),
    check('password', 'Password is Required').exists()
], async (req, res) => {
    // Checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ msg: "Try Again with Valid params" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Try Again with Valid params" })
        }

        const payload = {
            user: {
                id: user.id
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
        res.status(500).send("Server Error")
    }
})




module.exports = router;