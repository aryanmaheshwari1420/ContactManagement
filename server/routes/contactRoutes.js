
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/import', upload.single('file'), contactController.importContacts);
router.get('/contacts', contactController.getContacts);
router.delete('/deleteContacts', contactController.deleteAllContacts);

module.exports = router;
