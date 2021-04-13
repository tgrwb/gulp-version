
const {src, dest} = require('gulp');

exports.default = function (cb) {
	for (var i in exports) {
		console.log('gulp ' + i);
	}
	cb();
};

const version = require('./lib/version.js');
exports.version = version;
exports.ooo = version;
exports.oooa = version;
exports.ooi = version;
exports.ooia = version;
exports.oio = version;
exports.ioo = version;
