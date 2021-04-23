
/* global process */

const fs = require('fs');
const path = require('path');
const paths = [
	{
		path: 'package.json',
		match: /"version": "(.*)"/,
		pattern: /("version": ")([0-9\.a]*)/,
		replacement: '$1'
	},
	{
		path: 'package-lock.json',
		match: /"version": "(.*)"/,
		pattern: /("version": ")([0-9\.a]*)/,
		replacement: '$1'
	}
];

module.exports = (cb)=>{
	if ('string' === typeof cb) {
		const incrementType = cb;
		return (cb)=>{
			const params = require('./_get_tgrwb_gulp_config.js')('version');
			_version(params, incrementType);
			cb();
		};
	} else {
		const params = require('./_get_tgrwb_gulp_config.js')('version');
		const incrementType = process.argv[2];
		_version(params, incrementType);
		cb();
	}
};

function _version(params, incrementType) {
	try {
		incrementType = checkIncrementType(incrementType);

		params.paths = params.paths || [];
		params.paths.unshift(paths[0], paths[1]);

		let versionOld, versionNew;
		let dataNew = new Date().toUTCString();

		for (let i in params.paths) {
			let obj = params.paths[i];
			let pathFile, content, contentNew;
			if (obj.path) {
				pathFile = path.resolve(params.cwd, obj.path);
				content = getContent(pathFile);
			}
			if (content) {
				if (obj.match.test(content)) {
					versionOld = content.match(obj.match)[1].trim();
					if (! versionNew) {
						versionNew = increment(versionOld, incrementType);
					}
					contentNew = content
						.replace(/Date:[^<\'\"]*/, 'Date: ' + dataNew)
						.replace(obj.pattern, obj.replacement + versionNew);

					if (versionNew !== versionOld) {
						console.log(`${versionOld} >>> ${versionNew}`);
					} else {
						console.log(`${versionOld} === ${versionNew}`);
					}

					if (contentNew !== content) {
						console.log(`Content updated => ${pathFile}`);
						setContent(pathFile, contentNew);
					}
				} else {
					console.warn(`Not found => ${obj.match} in file => ${pathFile}`);
				}
			}
		}
	} catch (e) {
		console.error(e);
	}
};

function increment(version, incrementType) {
	let versionA = version.split('.');
	switch (incrementType) {
		case 'ioo':
		{
			versionA[0] ++;
			versionA[1] = 0;
			versionA[2] = 0;
			break;
		}
		case 'oio':
		{
			versionA[1] ++;
			versionA[2] = 0;
			break;
		}
		case 'ooi':
		{
			versionA[2] = parseInt(versionA[2]) + 1;
			break;
		}
		case 'ooia':
		{
			versionA[2] = parseInt(versionA[2]) + 1;
			versionA[2] = parseInt(versionA[2]) + 'a';
			break;
		}
		case 'ooo':
		{
			versionA[2] = parseInt(versionA[2]);
			break;
		}
		case 'oooa':
		{
			versionA[2] = parseInt(versionA[2]) + 'a';
			break;
		}
	}
	return versionA.join('.');
}

function checkIncrementType(incrementType) {
	if (! incrementType || ! incrementType.match(/^(ooo|oooa|ooi|ooia|oio|ioo|version)$/)) {
		let newIncrementType = 'version';
		console.warn(`Increment type fixed => '${incrementType}' => '${newIncrementType}'`);
		incrementType = newIncrementType;
	}
	return incrementType;
}

function getContent(pathFile) {
	try {
		if (fs.existsSync(pathFile)) {
			return fs.readFileSync(pathFile).toString();
		} else {
			console.warn(`File not found => ${pathFile}`);
			return '';
		}
	} catch (e) {
		console.error(e);
	}
}

function setContent(pathFile, content) {
	try {
		fs.writeFileSync(pathFile, content);
	} catch (e) {
		console.error(e);
	}
}
