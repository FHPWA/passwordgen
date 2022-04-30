const extname = require("path").extname
const htmlmin = require("./htmlmin")
const jsmin = require("./jsmin")
const cleancss = require("./cleancss")
module.exports = async (content, outputPath) => {
	const ext = extname(outputPath)
	switch (ext) {
		case ".html":
			return htmlmin(content)
		case ".js":
			return jsmin(content)
		case ".css":
			return cleancss(content)
		default:
			return content
	}
}
