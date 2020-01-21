const express = require('express')
const router = express.Router();

// Routes Post api/users
// Registering a user
// Public
router.post('/', (req, res) => {
    res.send('Registered a User')
})



module.exports = router;