
const fs = require('fs');
const path = require('path');

module.exports = function (paramName) {

	// Search path
	const cwd = process.cwd();
	const basePath = path.resolve(cwd, 'tgrwb.gulp.js');
	const customPath = path.resolve(cwd, 'tgrwb.gulp.' + paramName + '.js');

	// Get base params
	const baseParams = require('./../../tgrwb.gulp.js');
	const customBaseParams = basePath && fs.existsSync(basePath) ? require(basePath) : {};
	for (let i in customBaseParams) {
		baseParams[i] = customBaseParams[i];
	}

	// Get params
	const params = require('./../../tgrwb.gulp.' + paramName + '.js')(baseParams);
	params.cwd = cwd;
	const customParams = customPath && fs.existsSync(customPath) ? require(customPath)(baseParams) : {};
	for (let i in customParams) {
		params[i] = customParams[i];
	}

	return params;
};
