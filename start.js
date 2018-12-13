require('dotenv').config();
const mongoose = require('mongoose');


require('./models/Fellow');
const app = require('./app');

const server = app.listen(8080, () => {
	console.log(`Express is running on port ${server.address().port}`);
});

const options = {
	useNewUrlParser: true,
};

mongoose.connect(process.env.DATABASE, options);
mongoose.Promise = global.Promise;
mongoose.connection
	.on('connected', () => {
		console.log(`Mongoose connection open on ${process.env.DATABASE}`);
	})
	.on('error', (err) => {
		console.log(`Connection error: ${err.message}`);
	});
