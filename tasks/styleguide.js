/**
 * style-guide
 */
var gulp = require('gulp');
var _ = require('lodash');
var config = require('./config');
var styledocco = require('gulp-styledocco');

//
gulp.task('styledocco', function() {
   var guideOptions = _.merge({
      name: 'test',
      'no-minify': true
   }, config.styleguide);
   return gulp.src(config.path.style.src)
      .pipe(styledocco(guideOptions));
});
