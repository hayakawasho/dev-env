'use strict';
/**
 * style-guideタスク
 */
let gulp = require('gulp');
let config = require('./config');
let styleguide = require('sc5-styleguide');
let sass = require('gulp-sass');
gulp.task('styleguide:generate', () => {
	return gulp.src(config.path.style.watch)
   .pipe(styleguide.generate({
		title: config.styleguide.title,
		server: config.styleguide.server,
		port: config.styleguide.port,
		rootPath: config.styleguide.out,
		overviewPath: config.styleguide.overviewPath,
		sideNav: config.styleguide.sideNav,
		disableEncapsulation: config.styleguide.disableEncapsulation,
		extraHead: config.styleguide.extraHead,
	}))
   .pipe(gulp.dest(config.styleguide.out));
});
gulp.task('styleguide:applystyles', () => {
	return gulp.src(config.path.style.watch)
   .pipe(sass())
   .pipe(styleguide.applyStyles())
   .pipe(gulp.dest(config.styleguide.out));
});
gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
