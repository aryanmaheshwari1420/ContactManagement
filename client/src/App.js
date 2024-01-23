// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactImport from './components//ContactImport';
import ContactList from './components/ContactList';
import Pagination from './components//Pagination';
const helper = require('./helper');

const App = () => {
	const [contacts, setContacts] = useState([]);
	const [totalContacts, setTotalContacts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [contactsPerPage, setContactsPerPage] = useState(10);

	useEffect(() => {
		const fetchContacts = async () => {
			try {
				const response = await axios.get(
					`${helper}/api/contacts?page=${currentPage}&limit=${contactsPerPage}`
				);
				setContacts(response.data.contacts);
				setTotalContacts(response.data.contactsCount);
			} catch (error) {
				console.error('Error fetching contacts:', error);
			}
		};
		fetchContacts();
	}, [currentPage, contactsPerPage]);

	useEffect(() => {
		const deleteAllContacts = async () => {
			try {
				await axios.delete(`${helper}/api/deleteContacts`);
				console.log('All contacts deleted successfully');
				setContacts([]);
			} catch (error) {
				console.error('Error deleting contacts:', error);
			}
		};
		deleteAllContacts();
	}, []);
	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage);
	};

	const handleImport = () => {
		setCurrentPage(1);
	};

	return (
		<div>
			<h1>Contact Management</h1>
			<ContactImport
				onImport={handleImport}
				updateContact={(updatedContacts, contactsCount) => {
					setContacts(updatedContacts);
					setTotalContacts(contactsCount);
				}}
				contactsPerPage={contactsPerPage}
			/>
			<ContactList contacts={contacts} />
			<Pagination
				totalItems={totalContacts}
				itemsPerPage={contactsPerPage}
				currentPage={currentPage}
				onPageChange={handlePageChange}
				handelItemsPerPage={(perPageItems) => {
					setContactsPerPage(perPageItems);
					console.log('perPageItems', perPageItems, contactsPerPage);
				}}
			/>
		</div>
	);
};

export default App;
