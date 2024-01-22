// ContactList.js

import React from 'react';
import './style.css';
const ContactList = ({ contacts }) => {
	console.log(contacts);

	const contactList = contacts || [];

	return (
		<div className='contactTableContainer'>
			<div
				className='contactNumberHeaderContainer'>
				<p>Name</p>
				<p>Phone</p>
				<p>Email</p>
				<p>Address</p>
			</div>
			{contactList.map((contact) => (
				<div
					key={contact._id}
					className='contactNumberContainer'>
					<p> {contact.name}</p>
					<p>{contact.phone}</p>
					<p>{contact.email}</p>
					<p>{contact.address}</p>
				</div>
			))}
		</div>
	);
};

export default ContactList;
