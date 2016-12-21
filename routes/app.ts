import * as express from 'express';
import * as path from 'path';
import * as webpack from 'webpack';
import * as open from 'open';
import config from '../webpack.config.dev';

import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import LogTest from './log';

class Server {
	public express: express.Application;
	private compiler: any;
	private port: number;

	public static bootstrap(): Server {
		return new Server();
	}

	constructor() {
		this.express = express();
		this.compiler = webpack(config);

		this.configure();
		this.middleware();
		this.mongooseConfigure();
		this.route();
	}

	configure() {
		this.port = 3000;
	}

	mongooseConfigure() {
		mongoose.connect('localhost:27017/price-monitor');

		this.express.use(logger('dev'));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({extended: false}));
		this.express.use(cookieParser());
		this.express.use(express.static(path.join(__dirname, 'public')));

		this.express.use(function (req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
			next();
		});

		this.express.use('/log', LogTest);
	}

	middleware() {
		this.express.use(require('webpack-dev-middleware')(this.compiler, {
			hot: true,
			filename: config.output.filename,
			watchOptions: {
				aggregateTimeout : 1000
			},
			publicPath: config.output.publicPath
		}));

		this.express.use(require('webpack-hot-middleware')(this.compiler, {
			log: console.log,
			path: '/__webpack_hmr',
			heartbeat: 10 * 1000,
		}));
	}

	route() {
		this.express.get('/', function (req: express.Request, res: express.Response) {
			res.sendFile(path.join(__dirname, '../public/index.html'));
		});
		this.express.listen(this.port, (err: string) => {
			if (err) {11
				console.log(err);
			} else {
				open('http://localhost:' + this.port, 'chrome');
			}
		});
	}
}

export default new Server().express;
