// RITA-project/src/modules/index.ts

import { startServer } from '..server/server';
import { initializeUI } from '../app/index';
import { initializeAppLogic } from './appLogic';

// Initialize your application logic
initializeAppLogic();

// Start the Node.js server
startServer();

// Initialize the UI logic
initializeUI();
