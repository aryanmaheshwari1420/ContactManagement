// controllers/contactController.js
const { Readable } = require('stream'); // Import Readable class
const Contact = require('../models/Contact');
const csvParser = require('csv-parser');
const xlsx = require('xlsx');

const importContacts = async (req, res) => {
	const buffer = req.file.buffer;

	// Process buffer based on file type (CSV or Excel)
	let contacts = [];

	try {
		// Check if it's a CSV file
		if (req.file.mimetype === 'text/csv') {
			contacts = await processCsv(buffer);
		}
		// Check if it's an Excel file
		else if (
			req.file.mimetype ===
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
			req.file.mimetype === 'application/vnd.ms-excel'
		) {
			contacts = await processExcel(buffer);
		} else {
			throw new Error('Invalid file format');
		}
		console.log('contacts...', contacts);
		// Store data in MongoDB (Contact model)
		await Contact.insertMany(contacts);

		res.status(200).send('Contacts imported successfully');
	} catch (error) {
		if (error.code === 11000) {
			console.error('Error importing contacts - Duplicate email:', error);
			res.status(400).send('Duplicate email addresses found');
		} else {
			console.error('Error importing contacts:', error);
			res.status(500).send('Internal Server Error');
		}
	}
};

const processCsv = async (buffer) => {
	return new Promise((resolve, reject) => {
		const contacts = [];

		try {
			const parser = csvParser();

			parser.on('data', (row) => {
				contacts.push(row);
			});

			parser.on('end', () => {
				resolve(contacts);
			});

			parser.on('error', (error) => {
				reject(error);
			});

			// Convert the buffer to a readable stream
			const bufferStream = new Readable();
			bufferStream.push(buffer);
			bufferStream.push(null);

			// Pipe the buffer stream to the parser
			bufferStream.pipe(parser);
		} catch (error) {
			reject(error);
		}
	});
};

const processExcel = async (buffer) => {
	const contacts = [];

	return new Promise((resolve, reject) => {
		try {
			const workbook = xlsx.read(buffer, { type: 'buffer' });

			workbook.SheetNames.forEach((sheetName) => {
				const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
				contacts.push(...rows);
			});

			resolve(contacts);
		} catch (error) {
			reject(error);
		}
	});
};

const getContacts = async (req, res) => {
	const { page = 1, limit = 10 } = req.query;

	try {
		const skip = Math.max(0, (page - 1) * limit); // Ensure skip is not negative

		const contacts = await Contact.find().skip(skip).limit(parseInt(limit));
		const contactsCount = await Contact.find().count();
		res.status(200).json({
			contacts: contacts,
			contactsCount: contactsCount,
		});
	} catch (error) {
		console.error('Error fetching contacts:', error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = {
	importContacts,
	getContacts,
};
