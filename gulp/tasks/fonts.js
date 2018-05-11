'use strict';

var gulp = require('gulp');

gulp.task('fonts', function() {

  return gulp.src(['src/fonts/**/*'])
    .pipe(gulp.dest(global.destination + '/fonts'));
});