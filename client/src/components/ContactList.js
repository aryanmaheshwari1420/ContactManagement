// ContactList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`/api/contacts?page=${currentPage}&limit=${contactsPerPage}`);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error.message);
      }
    };

    fetchContacts();
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div>
      {/* Display contacts */}
      {contacts.map((contact) => (
        <div key={contact._id}>
          {/* Display contact information */}
          <p>{contact.name}</p>
          <p>{contact.phoneNumber}</p>
          <p>{contact.email}</p>
          {/* ... Other fields */}
        </div>
      ))}

      {/* Pagination controls */}
      <Pagination
        pageCount={10} // Replace with actual pageCount based on total contacts
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ContactList;
