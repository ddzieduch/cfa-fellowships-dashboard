const express = require('express');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');

const router = express.Router();
const Fellow = mongoose.model('Fellow');

var app = express()

router.get('/add-new-fellow', (req, res) => {
	res.render('form', { title: 'Add new fellow' });
});

router.post('/add-new-fellow',
	[
		body('first')
			.isLength({ min: 1 })
			.withMessage('Please enter a first name'),
		body('last')
			.isLength({ min: 1 })
			.withMessage('Please enter a last name'),
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email'),
	],

	(req, res) => {
	const errors = validationResult(req);


	if (errors.isEmpty()) {
		const fellow = new Fellow(req.body);
		fellow.name = {
					'first': req.body.first,
					'last': req.body.last,
		}
		fellow.markModified('name');
		fellow.save()
			.then(() => { res.send('Thank you for your registration!'); })
			.catch(() => { res.send('Sorry! Something went wrong.'); });
	} else {
		res.render('form', {
			title: 'Registration form',
			errors: errors.array(),
			data: req.body,
		});
	}
});

router.get('/', (req, res) => {

	const fellowshipsAvgAge = Fellow.aggregate(
		[{
			$group:
			{
				_id: { fellowship: "$fellowship" },
				totalAge: { $sum: "$age" },
				count: { $sum: 1 },
				fellow: { $push: "$$ROOT" }
			}
		},
		{
			$project:
			{
				_id:"$_id",
				fellowship:1,
				totalAge:1,
				count:1,
				fellow:1,
				avgAge: { $divide: [ "$totalAge", "$count" ] }
			}
		}]
	);

	const youngestFellow = Fellow.find().sort({age:+1}).limit(1);

	const oldestFellow = Fellow.find().sort({age:-1}).limit(1);

	Promise.all([fellowshipsAvgAge, youngestFellow, oldestFellow])
	.then((results) => {
		const fellowshipsAvgAge = results[0];
		const youngestFellow = results[1];
		const oldestFellow = results[2];

		res.render('index', { title: 'Listing fellows', fellowshipsAvgAge, youngestFellow, oldestFellow });
	})
	.catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/import', (req, res) => {
	res.render('import', { title: 'Inport new fellow' });
});

router.post('/import', upload.single('importFile'), (req, res) => {
	const fellowships = JSON.parse(req.file.buffer.toString());
	Fellow.insertMany(fellowships, function(error, docs) {});
	res.render('import', { title: 'Inport new fellow' });
});

module.exports = router;
