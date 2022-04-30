module.exports = function (config) {
	config.addTransform("minify", require("./transforms/minify"))
	config.addPassthroughCopy("./src/images")
	config.addPassthroughCopy("./src/resources")
	return {
		passthroughFileCopy: true,
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		templateFormats: ["html", "css", "js", "njk", "md"],
		dir: {
			input: "src",
			output: "dist",
			includes: "includes",
			layouts: "layouts",
			data: "data",
		},
	}
}
