/**
 * imagesタスク
 *
 */
var gulp = require('gulp');
var config = require('./config');
var imagemin = require('gulp-imagemin');

gulp.task('images', function() {
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
