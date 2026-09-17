import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js"; 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:2727/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Check if user already linked Google OAuth
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const email = profile.emails[0].value;
          // 2. Check if user with this email already exists
          user = await User.findOne({ email });

          if (user) {
            // 3. Link Google OAuth to existing account
            user.googleId = profile.id;
            if (!user.avatar) {
              user.avatar = profile.photos[0].value;
            }
            user.isVerified = true; // pre-verified by Google
            await user.save();
          } else {
            // 4. Create new user
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email,
              avatar: profile.photos[0].value,
              isVerified: true, // pre-verified by Google
            });
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;