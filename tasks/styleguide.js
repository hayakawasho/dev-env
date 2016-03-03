/**
 * style-guideタスク
 */
var gulp = require('gulp');
var config = require('./config');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');

gulp.task('styleguide:generate', function() {
   return gulp.src(config.path.style.src)
      .pipe(styleguide.generate({
         title: config.styleguide.name,
         server: config.styleguide.server,
         rootPath: config.styleguide.out,
         overviewPath: config.styleguide.overviewPath
      }))
      .pipe(gulp.dest(config.styleguide.out));
});

gulp.task('styleguide:applystyles', function() {
   return gulp.src(config.path.style.src)
      .pipe(sass({
         errLogToConsole: config.styleguide.errLogToConsole
      }))
      .pipe(styleguide.applyStyles())
      .pipe(gulp.dest(config.styleguide.out));
});


gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
