
const {src, dest} = require('gulp');

exports.default = function (cb) {
	for (var i in exports) {
		console.log('gulp ' + i);
	}
	cb();
};

const version = require('./lib/version.js');
exports.version = version('version');
exports.ooo = version('ooo');
exports.oooa = version('oooa');
exports.ooi = version('ooi');
exports.ooia = version('ooia');
exports.oio = version('oio');
exports.ioo = version('ioo');
