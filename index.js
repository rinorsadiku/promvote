const express = require('express');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const passport = require('passport');

// Generate an express app
const app = express();

// Passport config
require('./services/passport');

// Wire up middlwares for passport ussage
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.send({ promvote: 'says hi' });
});

// Authentication route handlers
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
