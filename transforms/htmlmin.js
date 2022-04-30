const minify = require("html-minifier").minify
module.exports = async (content, outputPath) => {
	return minify(content, {
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJS: true,
		removeComments: true,
		removeOptionalTags: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeTagWhitespace: true,
	})
}
