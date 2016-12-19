import * as express from 'express';
import * as path from 'path';
import * as webpack from 'webpack';
import * as open from 'open';
import config from '../webpack.config.dev';

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
		this.route();
	}

	configure() {
		this.port = 3000;
	}

	middleware() {
		this.express.use(require('webpack-dev-middleware')(this.compiler, {
			noInfo: true,
			watchOptions: {
				aggregateTimeout: 300,
				poll: true
			},
			publicPath: config.output.publicPath
		}));
	}

	route() {
		this.express.get('/', function (req, res) {
			res.sendFile(path.join(__dirname, '../public/index.html'));
		});
		this.express.listen(this.port, (err: string) => {
			if (err) {
				console.log(err);
			} else {
				open('http://localhost:' + this.port);
			}
		});
	}
}

export default new Server().express;
