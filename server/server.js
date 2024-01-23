// server.js

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 5000;
const url = process.env.DATABASE
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Successfully connected to MongoDB');
  }
});


app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Import routes from separate file
const contactRoutes = require('./routes/contactRoutes');
app.use('/api', contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
