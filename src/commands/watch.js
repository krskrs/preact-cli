const getCert = require('../lib/ssl-cert');
const runWebpack = require('../lib/webpack/run-webpack');
const { warn } = require('../util');
const { showStats } = runWebpack;

module.exports = async function (src, argv) {
	argv.src = src || argv.src;
	argv.production = false;

	if (argv.https || process.env.HTTPS) {
		let ssl = await getCert();
		if (!ssl) {
			ssl = true;
			warn('Reverting to `webpack-dev-server` internal certificate.');
		}
		argv.https = ssl;
	}

	let stats = await runWebpack(true, argv, showStats);
	showStats(stats);
};
