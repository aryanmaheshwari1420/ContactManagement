// routes/contactList.js
const express = require('express');
const router = express.Router();
const { getPaginatedContacts } = require('../controllers/contactList');

// GET request for paginated contact listing
router.get('/', getPaginatedContacts);

module.exports = router;
