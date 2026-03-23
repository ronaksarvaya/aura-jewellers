const Contact = require('../models/Contact');

const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        console.log('\n=== NEW CONTACT MESSAGE RECEIVED ===');
        console.log(`From: ${name} <${email}>`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: \n${message}`);
        console.log('====================================\n');

        const newContact = await Contact.create({
            name, email, subject, message
        });

        res.status(201).json({ success: true, message: 'Message received and logged successfully.' });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { submitContact };
