//dataController.ts

import express, { Request, Response } from 'express';
import { authenticateUser } from './authController'; // Import your authentication function

const router = express.Router();

// Sample inventory data (in-memory for demonstration)
let inventory = [
  { id: 1, name: 'Item 1', quantity: 100 },
  { id: 2, name: 'Item 2', quantity: 50 },
  // Add more sample data as needed
];

// Generate a unique ID for new data entries
let nextId = 3;

// Define routes related to data management

// Get all inventory items
router.get('/data', authenticateUser, (req: Request, res: Response) => {
  res.json(inventory);
});

// Create a new inventory item
router.post('/data', authenticateUser, (req: Request, res: Response) => {
  const { name, quantity } = req.body;

  if (!name || !quantity) {
    return res.status(400).json({ error: 'Name and quantity are required.' });
  }

  const newItem = {
    id: nextId++,
    name,
    quantity,
  };

  inventory.push(newItem);

  res.status(201).json(newItem);
});

// Get a specific inventory item by ID
router.get('/data/:id', authenticateUser, (req: Request, res: Response) => {
  const itemId = parseInt(req.params.id);

  const item = inventory.find((entry) => entry.id === itemId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  res.json(item);
});

// Update a specific inventory item by ID
router.put('/data/:id', authenticateUser, (req: Request, res: Response) => {
  const itemId = parseInt(req.params.id);
  const { name, quantity } = req.body;

  const itemIndex = inventory.findIndex((entry) => entry.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  inventory[itemIndex] = { ...inventory[itemIndex], name, quantity };

  res.json(inventory[itemIndex]);
});

// Delete a specific inventory item by ID
router.delete('/data/:id', authenticateUser, (req: Request, res: Response) => {
  const itemId = parseInt(req.params.id);

  const itemIndex = inventory.findIndex((entry) => entry.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  const deletedItem = inventory.splice(itemIndex, 1)[0];

  res.json(deletedItem);
});

export default router;
