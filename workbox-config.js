module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,css,html,json,png}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};