const passport = require('passport');

module.exports = app => {
	// Google Authentication Routes
	app.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['profile', 'email'] })
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google', { failureRedirect: '/' }),
		(req, res) => {
			// Successful authentication, redirect to app.
			res.redirect('/app');
		}
	);

	// Facebook Authentication Routes
	app.get(
		'/auth/facebook',
		passport.authenticate('facebook', { scope: ['email'] })
	);

	app.get(
		'/auth/facebook/callback',
		passport.authenticate('facebook', { failureRedirect: '/' }),
		(req, res) => {
			// Successful authentication, redirect home.
			res.redirect('/app');
		}
	);

	// Instagram Authentication Routes
	app.get('/auth/instagram', passport.authenticate('instagram'));

	app.get(
		'/auth/instagram/callback',
		passport.authenticate('instagram', { failureRedirect: '/' }),
		function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/app');
		}
	);
};
