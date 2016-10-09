'use strict';
/**
 * imagesタスク
 *
 */
let gulp = require('gulp');
let config = require('./config');
let imagemin = require('gulp-imagemin');
gulp.task('image', () => {
	return gulp.src(config.path.image.src).pipe(imagemin({
		optimizationLevel: 7,
		progressive: true,
		interlaced: true,
		svgoPlugins: [{ // svgの軽量化
			cleanupListOfValues: true,
			sortAttrs: true,
         removeViewBox: false
		}]
	}))
   .pipe(gulp.dest(config.path.image.dest));
});
