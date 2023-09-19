const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const user_id = process.env.USER_ID || 'Masken';
const email = process.env.EMAIL || 'kartik.sharma2020@vitbhopal.ac.in';
const roll_number = process.env.ROLL_NUMBER || '20BCE10099';

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      throw new Error('Please enter valid data.'); // Checking for valid data format
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => typeof item === 'string' && item.match(/^[A-Za-z]$/));
    const highest_alphabet = alphabets.length > 0 ? alphabets.reduce((a, b) => (a > b ? a : b)) : null;

    const response = {
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: [highest_alphabet],
    };

    res.json(response);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred.' }); // 500 status code for server error
  }
});

app.get('/bfhl', (req, res) => {
  try {
    res.status(200).json({ operation_code: 1 });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred.' });  // 500 status code for server error
  }
});

app.use('/.netlify/functions/app', router);
module.exports.handler = serverless(app);
