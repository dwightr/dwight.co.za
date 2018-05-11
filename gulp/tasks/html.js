'use strict';

var gulp     	 = require('gulp'),
	gulpif		 = require('gulp-if'),
	useref = require('gulp-useref'),
	revReplace = require('gulp-rev-replace'),
	handleErrors = require('../util/handleErrors'),
	manifest = gulp.src("./dev/maps/rev-manifest.json");

// Compiles HTML includes
gulp.task('html', function() {
  return gulp.src(['src/*.html'])
	
	.pipe( gulpif(global.mode !== 'dev', revReplace({manifest: manifest})))
	.pipe( gulpif(global.mode !== 'dev', useref()))
    .on('error', handleErrors)
    .pipe(gulp.dest(global.destination));
});