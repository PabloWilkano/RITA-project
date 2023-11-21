// appLogic.ts

import { User, UserDataStore } from './userDataStore';
import { generateTOTP, sendSMS, sendEmail } from './mfaMethods';

class AppLogic {
  private userDataStore: UserDataStore;

  constructor() {
    // Initialize the user data store (database or in-memory storage)
    this.userDataStore = new UserDataStore();
  }

  async registerUser(username: string, password: string): Promise<User> {
    // Check if the username is already taken
    if (this.userDataStore.isUsernameTaken(username)) {
      throw new Error('Username already taken');
    }

    // Create a new user and hash their password
    const newUser: User = {
      username,
      password: await this.hashPassword(password),
      mfaEnabled: false, // MFA is disabled by default
      mfaSecret: '',     // Empty MFA secret
      roles: ['user'],   // Default role
    };

    // Store the user in the data store
    this.userDataStore.addUser(newUser);

    return newUser;
  }

  async loginUser(username: string, password: string): Promise<User> {
    const user = this.userDataStore.getUserByUsername(username);

    if (!user || !(await this.verifyPassword(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  async enableMFA(user: User): Promise<void> {
    // Generate a secret key for TOTP-based MFA
    const mfaSecret = generateTOTP();

    // Store the secret key and enable MFA for the user
    user.mfaSecret = mfaSecret;
    user.mfaEnabled = true;

    // Save the updated user data
    this.userDataStore.updateUser(user);
  }

  async verifyMFA(user: User, mfaCode: string): Promise<boolean> {
    if (!user.mfaEnabled) {
      throw new Error('MFA is not enabled for this user');
    }

    // Verify the provided MFA code
    return generateTOTP(user.mfaSecret) === mfaCode;
  }

  // Helper methods for password hashing and verification (use a secure library)
  private async hashPassword(password: string): Promise<string> {
    // Replace with actual password hashing logic (e.g., bcrypt)
    return password;
  }

  private async verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    // Replace with actual password verification logic (e.g., bcrypt compare)
    return inputPassword === hashedPassword;
  }
}

export default AppLogic;