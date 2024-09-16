const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function buildStyles() {
  return src("./openstyle/**/*.scss").pipe(sass()).pipe(dest("css"));
}

function watchTask() {
  watch(["./openstyle/**/*.scss"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
