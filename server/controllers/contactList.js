// controllers/contactList.js
const Contact = require('../models/contact');

// Logic to retrieve paginated contacts
const getPaginatedContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    // Retrieve paginated contacts from MongoDB
    results.results = await Contact.find().skip(startIndex).limit(limit);
    results.totalPages = Math.ceil((await Contact.countDocuments()) / limit);

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching paginated contacts:', error.message); 
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { getPaginatedContacts };
