'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	gulpif   = require('gulp-if'),
	replace = require('gulp-replace'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	handleErrors = require('../util/handleErrors');

gulp.task('scripts', function() {
	return gulp.src(['src/js/**/*.js'  ,'node_modules/jquery/dist/jquery.js' ])
	.pipe(gulpif(global.mode !== 'dev',uglify()))
	.on('error', handleErrors)
	.pipe(gulpif(global.mode === 'dev', gulp.dest(global.destination + '/js')))
});