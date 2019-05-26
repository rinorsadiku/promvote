const passport = require('passport');
const keys = require('../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('users');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;

// Helper function to finalize the authentication process
const authenticate = async (accessToken, refreshToken, profile, done) => {
	const existingUser = await User.findOne({ name: profile.displayName });

	if (existingUser) {
		console.log(`Logged in as ${existingUser.name}`);
		return done(null, existingUser);
	}

	const user = await new User({
		providerId: profile.id,
		name: profile.displayName,
		provider: profile.provider
	}).save();

	return done(null, user);
};

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => done(null, user));
});

// Setting up Google Strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientId,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		authenticate
	)
);

// Setting up Facebook Strategy
passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookAppId,
			clientSecret: keys.facebookAppSecret,
			callbackURL: '/auth/facebook/callback'
		},
		authenticate
	)
);

// Setting up Instagram Strategy
passport.use(
	new InstagramStrategy(
		{
			clientID: keys.instagramClientId,
			clientSecret: keys.instagramClientSecret,
			callbackURL: '/auth/instagram/callback'
		},
		authenticate
	)
);
