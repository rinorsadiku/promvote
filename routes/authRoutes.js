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
			res.redirect('/vote');
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
			res.redirect('/vote');
		}
	);

	// Instagram Authentication Routes
	app.get('/auth/instagram', passport.authenticate('instagram'));

	app.get(
		'/auth/instagram/callback',
		passport.authenticate('instagram', { failureRedirect: '/' }),
		(req, res) => {
			// Successful authentication, redirect home.
			res.redirect('/vote');
		}
	);

	// Logout Route
	app.get('/api/logout', (req, res) => {
		// This logout function is attached automatically to the request object by passport
		req.logout();
		res.redirect('/');
	});

	// Fetch Current User
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
