module.exports = function (config) {
  config.addTransform("minify", require("./transforms/minify"));
  config.addPassthroughCopy("./src/resources");
  return {
    passthroughFileCopy: true,
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "css", "js", "njk", "md", "png"],
    dir: {
      input: "src",
      output: "docs",
      includes: "includes",
      layouts: "layouts",
      data: "data",
    },
  };
};
