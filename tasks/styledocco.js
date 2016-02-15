/**
 * style-guideタスク
 */
var gulp = require('gulp');
var config = require('./config');
var styledocco = require('gulp-styledocco');

gulp.task('styledocco', function() {
   return gulp.src(config.path.style.watch)
      .pipe(styledocco({
         out: config.styleguide.out,
         name: config.styleguide.name,
         'no-minify': true
      }));
});
