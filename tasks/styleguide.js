'use strict';
/**
 * style-guideタスク
 */
let gulp = require('gulp');
let config = require('./config');
let styleguide = require('sc5-styleguide');
let sass = require('gulp-sass');

gulp.task('styleguide:generate', () => {
   return gulp.src(config.path.style.src)
      .pipe(styleguide.generate({
         title: config.styleguide.name,
         server: config.styleguide.server,
         port: config.styleguide.port,
         rootPath: config.styleguide.out, //Server root path
         overviewPath: config.styleguide.overviewPath,
         parsers: {
            //sass: 'scss',
            scss: 'scss'
         }
      }))
      .pipe(gulp.dest(config.styleguide.out));
});

gulp.task('styleguide:applystyles', () => {
   return gulp.src(config.path.style.src)
      .pipe(sass())
      .pipe(styleguide.applyStyles())
      .pipe(gulp.dest(config.styleguide.out));

});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
