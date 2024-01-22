import React, { useState } from 'react';
import axios from 'axios';
const helper = require('./helper');
const ContactImport = ({ onImport }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post(`${helper}/api/import`, formData);
      onImport();
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleImport}>Import Contacts</button>
    </div>
  );
};

export default ContactImport;
