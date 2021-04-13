
const {src, dest} = require('gulp');

exports.default = function (cb) {
	for (var i in exports) {
		console.log('gulp ' + i);
	}
	cb();
};

const task_version = require('./lib/version.js');
exports.ooo = task_version;
exports.oooa = task_version;
exports.ooi = task_version;
exports.ooia = task_version;
exports.oio = task_version;
exports.ioo = task_version;
