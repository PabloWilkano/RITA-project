// authRoutes.ts
// src/server/routes/authRoutes.ts

import express, { Request, Response, NextFunction } from 'express';
import * as authController from '../controllers/authController';

const authRouter = express.Router();

// Register a new user
authRouter.post('/register', authController.register);

// Login route
authRouter.post('/login', authController.login);

// Password reset request
authRouter.post('/reset-password-request', authController.requestPasswordReset);

// Password reset with token
authRouter.post('/reset-password', authController.resetPassword);

// Protect routes with role-based access control middleware
// Example middleware to check if a user has admin role
function checkAdminRole(req: Request, res: Response, next: NextFunction) {
  // Implement role-based logic here
  if (req.user && req.user.role === 'admin') {
    next(); // User has admin role, allow access
  } else {
    res.status(403).json({ message: 'Access denied. You need admin role.' });
  }
}

// Example route with role-based access control
authRouter.get('/admin-dashboard', checkAdminRole, (req: Request, res: Response) => {
  // Route accessible only to users with admin role
  res.json({ message: 'Admin dashboard data' });
});

export default authRouter;