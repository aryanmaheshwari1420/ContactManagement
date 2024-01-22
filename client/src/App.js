// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactImport from './components//ContactImport';
import ContactList from './components/ContactList';
import Pagination from './components//Pagination';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const contactsPerPage = 10;

  useEffect(() => {
    // Fetch contacts from backend based on the currentPage
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contacts?page=${currentPage}&limit=${contactsPerPage}`);
        setContacts(response.data.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleImport = () => {
    setCurrentPage(0);
  };

  return (
    <div>
      <h1>Contact Management</h1>
      <ContactImport onImport={handleImport} />
      <ContactList contacts={contacts} />
      <Pagination pageCount={10} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
