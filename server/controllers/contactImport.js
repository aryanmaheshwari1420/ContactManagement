// controllers/contactImport.js
const Papa = require('papaparse');
const xlsx = require('xlsx');
const Contact = require('../models/contact');

// Logic to import contacts from CSV or Excel
const importContacts = async (req, res) => {
  // Access the uploaded file via req.file
  const file = req.file;

  try {
    // Parse and process the file based on the format
    if (file.mimetype === 'text/csv') {
      // CSV file processing using PapaParse
      const csvData = Papa.parse(file.buffer.toString(), { header: true });
      // ... Logic to store contacts in MongoDB
         // ... Logic to store contacts in MongoDB
         await saveContactsToDatabase(csvData.data);
       } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
         // Excel file processing using xlsx library
         const workbook = xlsx.read(file.buffer, { type: 'buffer' });
         const sheetName = workbook.SheetNames[0];
         const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 'A' });
         // ... Logic to store contacts in MongoDB
         await saveContactsToDatabase(excelData);
       } else {
         throw new Error('Invalid file format');
       }

       res.status(200).send('Contacts imported successfully');
     } catch (error) {
       console.error('Error importing contacts:', error.message);
       res.status(500).send('Internal Server Error');
     }
   };

   // Function to save contacts to MongoDB
   const saveContactsToDatabase = async (contacts) => {
     // ... Logic to save contacts to MongoDB using the Contact model
     await Contact.insertMany(contacts);
   };

   module.exports = { importContacts };
