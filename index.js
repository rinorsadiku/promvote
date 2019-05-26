const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

// Require in all the models
require('./models/User');
require('./models/Vote');

// Setup database connection
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

mongoose.connection
	.once('open', () => console.log('Database connection has been established'))
	.on('error', error => console.log('Warning: ', error));

// Generate an express app
const app = express();

// Passport config
require('./services/passport');

// Wire up middlwares for passport
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Authentication route handlers
require('./routes/authRoutes')(app);
require('./routes/voteRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
