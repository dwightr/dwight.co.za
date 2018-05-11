'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prod', function(cb) {

  global.mode = 'prod';
  global.destination = 'prod';

  runSequence('clean', 'styles', ['scripts', 'html', 'images', 'copy'], cb);

});
