var gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass"));
// w3cValidation = require("gulp-w3c-html-validation"),
// //   rename = require("gulp-rename"), //For renaming file
// //   plumber = require("gulp-plumber"),
// //   w3cjs = require("gulp-w3cjs"),
// cssbeautify = require("gulp-cssbeautify");

//W3c Html Validation
function w3c() {
  return gulp.src("").pipe(
    w3cValidation({
      generateCheckstyleReport: "w3cErrors/validation.xml",
      remotePath: "http://localhost/seo", // use regex validation for domain check
      remoteFiles: [
        "/index.html",
        "/news-right-sidebar.html",
        "/news-single.html",
        "/about_us.html",
      ],
      relaxerror: [
        "Bad value X-UA-Compatible for attribute http-equiv on element meta.",
        "Element title must not be empty.",
      ],
    })
  );
}

function buildStyles() {
  return gulp
    .src("./sass/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
}
//SASS Compile

//Minifying CSS
function cssMini() {
  return sass("./sass/style.scss", {
    style: "compressed",
  })
    .pipe(rename("style.min.css"))
    .pipe(
      autoprefixer({
        browsers: [
          "> 1%",
          "last 2 versions",
          "Firefox ESR",
          "Firefox > 20",
          "iOS 7",
          "last 2 iOS major versions",
          "ie 6-8",
        ],
        cascade: false,
      })
    )
    .pipe(gulp.dest("./css/"));
}

//Prettify CSS
function cssPrettify() {
  return gulp
    .src("./css/style.css")
    .pipe(
      cssbeautify({
        indent: "   ",
        autosemicolon: true,
      })
    )
    .pipe(gulp.dest("./css/"));
}

exports.buildStyles = buildStyles;
exports.cssMini = cssMini;
exports.cssPrettify = cssPrettify;
exports.watch = function () {
  gulp.watch("./sass/style.scss", gulp.series(["buildStyles"]));
};
