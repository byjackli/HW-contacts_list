module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	plugins: ['react'],
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		jest: true,
		node: true,
	},
	parserOptions: {
		sourceType: 'module',
		requireConfigFile: false,
		babelOptions: {
			presets: [require.resolve('babel-preset-react-app/prod')],
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'react/jsx-uses-vars': 'warn',
		'react/jsx-uses-react': 'warn',
		'curly': ['error']
	},
};