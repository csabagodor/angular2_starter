import * as express from 'express';
import LogSchema from '../models/log';

class LogTest {
	public router: express.Router;

	constructor() {
		this.router = express.Router();
		this.routes();
	}

	routes() {
		this.router.post('/', function(req, res, next) {
			console.log('Started logging');

			let exec = require('child_process').exec;
			let cmd = 'phantomjs assets/app/hello.spec.js';

			exec(cmd, function(error, stdout, stderr) {
				if (error) {
					console.log(error);
				} else {
					console.log(stdout);

					let logNew = new LogSchema({
						title: 'Csabi Phantom indítva',
						description: stdout
					});

					logNew.save(function(err, result) {
						if (err) {
							return res.status(500).json({
								title: 'An error occurred',
								error: err
							});
						}
						res.status(201).json({
							message: 'Test saved and created',
							obj: result
						});
					});

				}
			});
		});

		this.router.get('/', function(req, res, next) {
			LogSchema.find()
			// .populate('user', 'firstName')
			.exec(function (err, messages) {
				if (err) {
					return res.status(500).json({
						title: 'An error occurred',
						error: err
					});
				}
				res.status(200).json({
					message: 'Success',
					obj: messages
				});
			});
		});
	}
}

export default new LogTest().router;
