// index.ts

import express from 'express';
import { config } from './config/config';
import { DataParser } from './src/modules/dataParser';
import { DataAggregator } from './src/modules/dataAggregator';
import { UserAuth } from './src/modules/userAuth';

// Initialize Express app
const app = express();

// Middleware for parsing JSON data
app.use(express.json());

// Initialize DataParser, DataAggregator, and UserAuth modules
const dataParser = new DataParser();
const dataAggregator = new DataAggregator();
const userAuth = new UserAuth();

// Define routes

// Sample route for parsing voice input
app.post('/api/parse-voice-input', (req, res) => {
  const voiceInput = req.body.voiceInput;
  const parsedData = dataParser.parseVoiceInput(voiceInput);
  dataAggregator.aggregateData(parsedData);
  res.json({ message: 'Voice input parsed and data aggregated successfully' });
});

// Sample route for user authentication
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (userAuth.authenticateUser(username, password)) {
    // Generate and send a JWT token on successful authentication
    const token = userAuth.generateAuthToken(username);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

// Start the server
const port = config.serverPort || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
