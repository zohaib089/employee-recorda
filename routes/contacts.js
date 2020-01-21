const express = require('express')
const router = express.Router();

// Routes Get api/contacts
// Getting all users contacts
// private
router.get('/', (req, res) => {
    res.send('Get all user contacts')
})




// Routes Post api/contacts
// add new contact
// private
router.post('/', (req, res) => {
    res.send('add a contact')
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