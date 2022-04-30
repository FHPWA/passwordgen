var CleanCSS = require("clean-css")
module.exports = async (content) => {
	return new CleanCSS([]).minify(content).styles
}
