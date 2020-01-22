const express = require('express')
const router = express.Router();
const User = require('../models/users');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Contact = require('../models/contact');
// Routes Get api/contacts
// Getting all users contacts
// private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({
            user: req.user.id
        }).sort({
            date: -1
        })
        res.json(contacts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})




// Routes Post api/contacts
// add new contact
// private
router.post('/', auth, (req, res) => {

})



// Routes Put api/contacts/:id
// update contact
// private
router.put('/:id', (req, res) => {
    res.send('update a contact')
})

// Routes Delete api/auth
// delete new contact
// private
router.delete('/:id', (req, res) => {
    res.send('Delete a contact')
})


module.exports = router;