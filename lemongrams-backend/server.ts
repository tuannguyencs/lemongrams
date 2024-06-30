import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/check', async (req, res) => {
//   const { word } = req.params;
  try {
    res.json({ valid: true });
  } catch (error) {
    res.json({ valid: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});