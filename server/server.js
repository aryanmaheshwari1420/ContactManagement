// server.js

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/ContactManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
