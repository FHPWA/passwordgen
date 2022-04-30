const minify = require("terser").minify
module.exports = async (content) => {
	const minified = await minify(content, {})
	return minified.code
}
