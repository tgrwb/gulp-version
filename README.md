# @tgrwb/gulp-version
Easy version update for your project

## install

```
npm i @tgrwb/gulp-version
```

## gulpfile.js

```
const version = require('@tgrwb/gulp-version');

exports.version = version('version');
exports.ooo = version('ooo');
exports.oooa = version('oooa');
exports.ooi = version('ooi');
exports.ooia = version('ooia');
exports.oio = version('oio');
exports.ioo = version('ioo');
```

## tgrwb.gulp.js (optional)

```
module.exports = {
	dirSrc: 'your_sourse_directory' // Default: 'src'
};
```

## tgrwb.gulp.version.js (optional)

```
module.exports = (baseParams)=>{
	const {dirSrc} = baseParams;
	return {
		paths: [
			{
				path:  `${dirSrc}/your_file.ext`,
				match: /Ver\.\s*(.*)/,
				pattern: /(Ver\.\s*)(.*)/,
				replacement: '$1'
			}
		]
	};
};
```

## Usage

```
gulp ooo  // 1.2.3a =>  1.2.3
gulp oooa // 1.2.3 =>  1.2.3a
gulp ooi  // 1.2.3a =>  1.2.4
gulp ooia // 1.2.4 =>  1.2.5a
gulp oio  // 1.2.5a =>  1.3.0
gulp ioo  // 1.3.0 =>  2.0.0
```
