'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync');

gulp.task('watch', function() {

  gulp.watch('src/*.html',  ['html']);
  gulp.watch('src/scss/**/*.scss',  ['styles','scsslint']); 
   
  gulp.watch('src/images/**/*',  ['images']);
  gulp.watch('src/fonts/**/*',  ['fonts']);
  gulp.watch('src/js/**/*.js',  ['scripts','jshints']);
});