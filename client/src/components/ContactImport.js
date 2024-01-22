// ContactImport.js
import React, { useState } from 'react';
import axios from 'axios';

const ContactImport = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    // Update selected file
    setSelectedFile(e.target.files[0]);
  };

  const handleImport = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Upload file to the backend for processing
      await axios.post('/api/import', formData);

      // Optionally: Show success message
      alert('Contacts imported successfully');
    } catch (error) {
      console.error('Error importing contacts:', error.message);
      // Show error message to the user
      alert('Error importing contacts. Please check the file format.');
    }
  };

  return (
    <div>
      {/* File input for selecting CSV/Excel file */}
      <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />

      {/* Button to trigger the import process */}
      <button onClick={handleImport}>Import Contacts</button>
    </div>
  );
};

export default ContactImport;
