const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();

app.use(bodyParser.json());

// Enable CORS for all origins (or specify your frontend URL)
// For development, you might use app.use(cors()); to allow all origins
app.use(cors());

// Sample user data
const user = {
  full_name: "john_doe",
  dob: "17091999",
  email: "john@xyz.com",
  roll_number: "ABCD123"
};

// Helper function to separate numbers and alphabets
const separateData = (data) => {
  let numbers = [];
  let alphabets = [];

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[A-Za-z]$/.test(item)) {
      alphabets.push(item);
    }
  });

  return { numbers, alphabets };
};

// Helper function to find the highest alphabet
const findHighestAlphabet = (alphabets) => {
  if (alphabets.length === 0) return [];
  
  let highest = alphabets[0];

  alphabets.forEach(letter => {
    if (letter.toLowerCase() > highest.toLowerCase()) {
      highest = letter;
    }
  });

  return [highest];
};


// POST /bfhl route
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: "Invalid input format" });
  }

  const { numbers, alphabets } = separateData(data);
  const highestAlphabet = findHighestAlphabet(alphabets);

  res.json({
    is_success: true,
    user_id: `${user.full_name}_${user.dob}`,
    email: user.email,
    roll_number: user.roll_number,
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet
  });
});

// GET /bfhl route
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
