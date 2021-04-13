
module.exports = (baseParams)=>{

	const {dirSrc} = baseParams;

	return {
		paths: [
			{
				path:  `${dirSrc}/style.css`,
				match: /Version:\s*(.*)/,
				pattern: /(Version:\s*)(.*)/,
				replacement: '$1'
			},
			{
				path: `${dirSrc}/index.php`,
				match: /Version:\s*(.*)/,
				pattern: /(Version:\s*)(.*)/,
				replacement: '$1'
			},
			{
				path: `${dirSrc}/index.html`,
				match: /Version:\s*([0-9\.]*a?)/,
				pattern: /(Version:\s*)([0-9\.]*a?)/,
				replacement: '$1'
			}
		]
	};
};
