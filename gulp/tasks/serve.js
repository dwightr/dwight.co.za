'use strict';

var gulp        = require('gulp'),
	browserSync = require('browser-sync').create();

gulp.task('serve',function(){
    browserSync.init({
        server: {
            baseDir: './dev/'
        },
        files: ['./dev/**/*.html',
        		'./dev/css/**/*.css',
        		'./dev/js/**/*.js',
        		'./dev/img/**/*.*'],
        notify: false
    });
});