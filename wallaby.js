var compilerOptions = require('./tsconfig.jest.json');
compilerOptions.module = 'commonjs';
compilerOptions.jsx = 'React';

module.exports = function (wallaby) {
	var path = require('path');
	var ts = require(path.join(wallaby.localProjectDir, 'node_modules/typescript'));
	return {
		files: [
			"src/**/*.ts?(x)",
			"!src/**/*.spec.ts?(x)",
			"package.json"
		],
		tests: [
			"src/**/*.spec.ts?(x)"
		],
		env: {
			type: "node",
			runner: "node"
		},
		compilers: {
			'src/**/*.ts?(x)': wallaby.compilers.typeScript(Object.assign(compilerOptions, {typescript: ts}))
		},
		testFramework: "jest",
		debug: true,
		bootstrap: function (wallaby) {
			wallaby.testFramework.configure({
				"globals": {
					"__TS_CONFIG__": "tsconfig.jest.json"
				},
				"setupTestFrameworkScriptFile": "./test-bundle.js",
				"transformIgnorePatterns": [
					"<rootDir>/node_modules/(?!react-rx-connect)"
				],
				"moduleNameMapper": {
					"^.+\\.(s?css|less)$": "<rootDir>/config/empty-module.js"
				}
			});
		}
	};
};