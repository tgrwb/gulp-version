
/* global process */

const _version = require('./_version.js');

module.exports = (cb)=>{
	if ('string' === typeof cb) {
		const incrementType = cb;
		return (cb)=>{
			const params = require('./js-dev-tools/_get_tgrwb_gulp_config.js')('version');
			_version(params, incrementType);
			cb();
		};
	} else {
		const params = require('./js-dev-tools/_get_tgrwb_gulp_config.js')('version');
		const incrementType = process.argv[2];
		_version(params, incrementType);
		cb();
	}
};
