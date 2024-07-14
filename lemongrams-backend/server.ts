import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

// API Website: https://raw.githubusercontent.com/jmlewis/valett/master/scrabble/sowpods.txt

dotenv.config();

// Initializing Express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Create a set to make it easier to look up the words
let wordSet: Set<string> = new Set();

const fetchWordList = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/jmlewis/valett/master/scrabble/sowpods.txt');
    const words = response.data.split('\n').map((word: string) => word.trim().toUpperCase());
    wordSet = new Set(words);
    console.log(`Word list loaded with ${wordSet.size} words.`);
  } catch (error) {
    console.error('Error fetching word list:', error);
  }
};

// function is called to load the word list as soon as the server starts
fetchWordList();

app.get('/check/:word', async (req, res) => {
  const { word } = req.params;
  const isValid = wordSet.has(word.toUpperCase());
  res.json({ valid: isValid });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});