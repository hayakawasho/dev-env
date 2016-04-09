'use strict';
/**
 * imagesタスク
 *
 */
let gulp = require('gulp');
let config = require('./config');
let imagemin = require('gulp-imagemin');

gulp.task('images', () => {
   return gulp.src(config.path.images.src)
      .pipe(imagemin({
         optimizationLevel: 7, // 試行回数
         progressive: true, // jpgの軽量化
         svgoPlugins: [{ // svgの軽量化
            removeRasterImages: true,
            cleanupListOfValues: true,
            sortAttrs: true
         }]
      }))
      .pipe(gulp.dest(config.path.images.dest));
});
