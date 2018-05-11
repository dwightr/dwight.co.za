'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', function(cb) {

  global.mode = 'dev';
  global.destination = 'dev';
  if (process.argv[3] == '-serve'){
  	global.serve = true;
  }

  if (global.serve != true) {
  	runSequence('clean', ['styles', 'scsslint', 'scripts', 'jshints', 'html', 'images', 'copy'], 'watch', cb);	
  } else {
  	runSequence('clean', ['styles', 'scsslint', 'scripts', 'jshints', 'html', 'images', 'copy', 'serve'], 'watch', cb);	
  }
  
});