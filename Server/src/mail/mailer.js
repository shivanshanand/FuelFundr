import { transporter, sender } from "./mailer.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

// 1. Verification Email
export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const html = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationCode
    );

    const info = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Verify Your Email - FuelFundr",
      html,
    });

    console.log("Verification email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error("Failed to send verification email");
  }
};

// 2. Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "🎉 Welcome to FuelFundr!",
      html: WELCOME_EMAIL_TEMPLATE(name),
    });

    console.log("Welcome email sent to", email);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error("Failed to send welcome email");
  }
};

// 3. Password Reset Email
export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetURL
    );

    const info = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Reset Your FuelFundr Password",
      html,
    });

    console.log("Password reset email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error("Failed to send password reset email");
  }
};

// 4. Password Reset Success
export const sendResetSuccessEmail = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Your FuelFundr Password Was Reset",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("Password reset success email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending reset success email", error);
    throw new Error("Failed to send password reset success email");
  }
};
