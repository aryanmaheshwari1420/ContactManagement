// server.js
const express = require('express');
const mongoose = require('mongoose');
const contactImportRouter = require('./routes/contactImport');
const contactListRouter = require('./routes/contactList');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/ContactManagement')
  .then(() => {
    console.log("Mongoose connected successfully");
  })
  .catch((error) => {
    console.error("Mongoose connection error:", error);
  });

// Routesc
app.use('/api/import', contactImportRouter);
app.use('/api/contacts', contactListRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
