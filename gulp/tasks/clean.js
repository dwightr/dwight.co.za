'use strict';

var gulp = require('gulp');
var del  = require('del');

gulp.task('clean', function() {
  return del.sync(global.destination);
});
