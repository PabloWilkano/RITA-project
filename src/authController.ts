// authController.ts

import { Request, Response } from 'express';
import { UserAuth } from '../modules/userAuth'; // Import the UserAuth module

export class AuthController {
  private userAuth: UserAuth;

  constructor() {
    // Initialize the UserAuth module here
    this.userAuth = new UserAuth();
  }

  // Register a new user
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, email } = req.body;
      // Check if the username or email is already in use
      const isUsernameTaken = this.userAuth.isUsernameTaken(username);
      const isEmailTaken = this.userAuth.isEmailTaken(email);

      if (isUsernameTaken || isEmailTaken) {
        res.status(400).json({ message: 'Username or email already in use' });
      } else {
        // Create a new user account and store it in your database
        this.userAuth.registerUser(username, password, email);
        res.status(201).json({ message: 'User registered successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Login endpoint
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      // Authenticate the user using UserAuth
      const isAuthenticated = this.userAuth.authenticate(username, password);

      if (isAuthenticated) {
        // Generate a JWT token and send it in the response
        const token = this.userAuth.generateToken(username);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Logout endpoint (if needed)
  async logout(req: Request, res: Response): Promise<void> {
    // Implement logout functionality if required
  }

  // Password reset endpoint
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      // Trigger the password reset process
      const resetToken = this.userAuth.initiatePasswordReset(email);
      // Send the reset link to the user's email
      // This step may involve sending an email with a reset link.
      // For simplicity, we're omitting the email sending logic here.

      res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}