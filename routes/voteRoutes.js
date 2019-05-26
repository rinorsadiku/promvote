const mongoose = require('mongoose');
const Vote = mongoose.model('votes');

const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/votes', requireLogin, async (req, res) => {
		// Add logic to verify the user who voted and add the vote to the database
		const { male, female } = req.body;

		const vote = await new Vote({
			male: male.trim().toLowerCase(), // Saving the results as lowercase to prevent, simple end-user errors such as add another uppercase letter which would make the vote not count
			female: female.trim().toLowerCase(),
			_user: req.user.id,
			dateSent: Date.now()
		}).save();

		// IMPORTANT: UNCOMMENT THIS IN PRODUCTION
		// req.user.voted = true;
		// await req.user.save();

		res.send({ male, female });
	});

	app.get('/api/votes', async (req, res) => {
		const males = await Vote.aggregate([
			{
				$group: {
					_id: { name: '$male' },
					uniqueNames: { $addToSet: '$_id' },
					count: { $sum: 1 }
				}
			},
			{
				$match: {
					count: { $gt: 1 }
				}
			},
			{
				$sort: {
					count: -1
				}
			}
		]);

		const females = await Vote.aggregate([
			{
				$group: {
					_id: { name: '$female' },
					uniqueNames: { $addToSet: '$_id' },
					count: { $sum: 1 }
				}
			},
			{
				$match: {
					count: { $gt: 1 }
				}
			},
			{
				$sort: {
					count: -1
				}
			}
		]);

		// Here we will combine the males and the females to put out all of the results
		const allMales = males.map(male => ({
			name: male._id.name,
			votes: male.count
		}));

		const allFemales = females.map(female => ({
			name: female._id.name,
			votes: female.count
		}));

		// Getting the males and the females with the most votes
		const votedMales = allMales.slice(0, 5);
		const votedFemales = allFemales.slice(0, 5);

		// Getting a combination of both the males and the females for displaying as 'results'
		const results = allFemales.concat(allMales);

		res.send({ males: votedMales, females: votedFemales, results });
	});
};
