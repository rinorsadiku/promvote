const passport = require('passport');
const keys = require('../config/keys');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;

// Setting up Google Strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientId,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log(profile);
		}
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
		(accessToken, refreshToken, profile, done) => {
			console.log(profile);
		}
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
		(accessToken, refreshToken, profile, done) => {
			console.log(profile);
		}
	)
);
