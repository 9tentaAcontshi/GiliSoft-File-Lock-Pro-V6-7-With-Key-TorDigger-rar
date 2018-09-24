export default (opts = {}) => {
	// Extract this preset specific options and pass the rest to @babel/preset-env
	const {
		// noDynamicImport = false,
		// noImportMeta = false,
		// noClassProperties = false,
		// noJsonStrings = false,
		presetEnv = {},
		...noPlugins
	} = opts || {};

	// Create the presets
	const presets = [['@babel/preset-env', { ...presetEnv }]];

	// Create the plugins
	const plugins = [];
	const wannabePlugins = {
		noDynamicImport: '@babel/plugin-syntax-dynamic-import',
		noImportMeta: '@babel/plugin-syntax-import-meta',
		noClassProperties: [
			'@babel/plugin-proposal-class-properties',
			{ loose: false },
		],
		noJsonStrings: '@babel/plugin-proposal-json-strings',
	};
	// Add them, only if user hasn't explicitly disabled it
	Object.keys(wannabePlugins).forEach(pKey => {
		if (noPlugins[pKey] !== true) {
			plugins.push(wannabePlugins[pKey]);
		}
	});

	// Return the preset and some of stage-3 plugins
	// We will remove them, once it becomes stage-4, i.e included in preset-env
	return {
		presets,
		plugins,
	};
};
