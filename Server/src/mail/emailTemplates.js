export const WELCOME_EMAIL_TEMPLATE = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to FuelFundr</title>
</head>
<body style="margin: 0; font-family: Arial, sans-serif; background-color: #f6f8fa; color: #333;">
  <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    
    <img src="https://i.ibb.co/YT5h9xS/fuelfundr-logo-banner.png" alt="FuelFundr" style="width: 100%; max-height: 300px; object-fit: cover; background-color: #111;" />

    <div style="padding: 24px;">
      <h2 style="color: #000;">Welcome, ${name}!</h2>
      <p>Thanks for choosing <strong>FuelFundr</strong> 🚀 We’re thrilled to have you onboard.</p>
      <p>Let’s get you started with your journey to innovation and impact.</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://fuelfundr.vercel.app" style="background-color: #4f83ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Next Step</a>
      </div>

      <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;">

      <h3>Also check some other projects built by our developer</h3>

      <div style="display: flex; gap: 20px; flex-direction: column;">
        <a href="https://movie-app.example.com" style="display: flex; gap: 16px; align-items: center; text-decoration: none;">
          <img src="https://i.ibb.co/41dKGDR/movie-reco-thumb.png" alt="Movie Recommender" style="width: 120px; border-radius: 6px;" />
          <strong style="color: #1a1a1a; font-size: 1rem;">Movie Recommender System</strong>
        </a>

        <a href="https://shivansh-portfolio.example.com" style="display: flex; gap: 16px; align-items: center; text-decoration: none;">
          <img src="https://i.ibb.co/ypBcszY/portfolio-thumb.png" alt="Portfolio" style="width: 120px; border-radius: 6px;" />
          <strong style="color: #1a1a1a; font-size: 1rem;">Personal Portfolio</strong>
        </a>
      </div>

      <p style="margin-top: 40px; font-size: 0.9em; color: #666;">
        We hope you enjoy this journey as much as we enjoy creating it for you.
      </p>
    </div>

    <div style="background-color: #f0f0f0; text-align: center; padding: 16px; font-size: 0.8em; color: #777;">
      <p>© FUELFUNDR • MODEL TOWN • HOSHIARPUR, 146001, INDIA</p>
      <a href="#" style="color: #999; text-decoration: underline;">Unsubscribe</a>
    </div>
  </div>
</body>
</html>
`;

export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
