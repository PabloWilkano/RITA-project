// dataRoutes.ts
// src/server/routes/dataRoutes.ts

import express, { Request, Response } from 'express';
import { VoiceToText, DataParser, DataAggregator } from '../controllers/dataController';

const dataRouter = express.Router();

// Route to handle voice-to-text inventory entry
dataRouter.post('/voice-to-text-entry', async (req: Request, res: Response) => {
  try {
    // Capture voice input using the VoiceToText class
    const voiceInput = VoiceToText.captureVoiceInput(req.body.audio);

    // Convert voice input to structured inventory data using DataParser
    const structuredData = DataParser.parse(voiceInput);

    // Store structured data in your database or perform further processing

    // Respond with a success message
    return res.status(200).json({ message: 'Inventory data entered successfully.' });
  } catch (error) {
    // Handle errors appropriately, e.g., log them and send an error response
    return res.status(500).json({ error: 'An error occurred while processing the data.' });
  }
});

// Route to display structured data in an HTML table
dataRouter.get('/display-data', async (req: Request, res: Response) => {
  try {
    // Fetch structured data from your database or wherever it's stored

    // Create an HTML table with the structured data
    const htmlTable = DataAggregator.createHTMLTable(structuredData);

    // Send the HTML table as a response
    return res.status(200).send(htmlTable);
  } catch (error) {
    // Handle errors appropriately, e.g., log them and send an error response
    return res.status(500).json({ error: 'An error occurred while displaying structured data.' });
  }
});

export default dataRouter;