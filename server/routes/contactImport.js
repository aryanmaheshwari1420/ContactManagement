// routes/contactImport.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { importContacts } = require('../controllers/contactImport');

const upload = multer({ dest: 'uploads/' });

// POST request for importing contacts
router.post('/', upload.single('file'), importContacts);

module.exports = router;
