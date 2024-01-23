import React, { useEffect, useState } from "react";
import axios from "axios";
import helper from "./helper";
const ContactImport = ({ onImport, updateContact, contactsPerPage }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    if (file !== null) {
      handleImport();
    }
  }, [file]);
  const handleImport = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("contactsPerPage", contactsPerPage);

      const res = await axios.post(`${helper}/api/import`, formData);

      console.log(res);
      updateContact(res.data.contacts, res.data.contactsCount);
      onImport();
    } catch (error) {
      console.error("Import failed:", error);
    }
  };

  return (
    <div className="importButtonContainer">
      <label htmlFor="importFile" className="importLabelClassName">
        <div>+ </div>
        <div>import</div>
        <input id="importFile" type="file" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export default ContactImport;
