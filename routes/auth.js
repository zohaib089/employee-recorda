const express = require('express')
const router = express.Router();

// Routes Get api/auth
// Getting a logged in User
// private
router.get('/', (req, res) => {
    res.send('Get a logged in User')
})




// Routes Post api/auth
// Authenticate USer and get token
// public
router.post('/', (req, res) => {
    res.send('login a user')
})




module.exports = router;