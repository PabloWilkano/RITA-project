// userAuth.ts

import * as bcrypt from 'bcrypt'; // For hashing passwords
import * as speakeasy from 'speakeasy'; // For TOTP-based MFA
import * as nodemailer from 'nodemailer'; // For sending email (for password reset)
import { User, UserRole } from './models'; // Assuming you have a User model

class UserAuth {
  constructor(private users: User[]) {}

  // User Login
  async login(username: string, password: string): Promise<boolean> {
    const user = this.users.find((u) => u.username === username);

    if (!user) {
      return false; // User not found
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return false; // Password incorrect
    }

    if (user.isMFAEnabled) {
      return false; // MFA required
    }

    return true; // Login successful
  }

  // Enable MFA for a user
  enableMFA(userId: number): string {
    const user = this.users.find((u) => u.id === userId);

    if (!user) {
      return 'User not found';
    }

    // Generate a secret key for TOTP
    const secret = speakeasy.generateSecret({ length: 20 });

    user.isMFAEnabled = true;
    user.mfaSecret = secret.base32;

    return secret.otpauth_url; // Return the OTP URL for user setup
  }

  // Verify MFA for a user
  verifyMFA(userId: number, token: string): boolean {
    const user = this.users.find((u) => u.id === userId);

    if (!user || !user.isMFAEnabled || !user.mfaSecret) {
      return false;
    }

    return speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token,
      window: 2, // Allow for a 2-step variance in token generation
    });
  }

  // Reset a user's password and send them an email
  async resetPassword(username: string, newPassword: string): Promise<boolean> {
    const user = this.users.find((u) => u.username === username);

    if (!user) {
      return false; // User not found
    }

    // Generate a reset token (for email link)
    const resetToken = await bcrypt.hash(newPassword, 10); // Hash the new password for reset token

    // Send the reset token to the user's email address (using nodemailer)
    const transporter = nodemailer.createTransport(/* configure your email service */);
    const mailOptions = {
      to: user.email,
      subject: 'Password Reset',
      text: `Click this link to reset your password: https://example.com/reset?token=${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    return true; // Password reset email sent
  }

  // Role-based Access Control (RBAC)
  hasAccess(user: User, requiredRoles: UserRole[]): boolean {
    return user && requiredRoles.some((role) => user.roles.includes(role));
  }
}

export { UserAuth };