'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sassLint     = require('gulp-sass-lint'),
    handleErrors = require('../util/handleErrors');

gulp.task('scsslint', function () {

  return gulp.src(['src/scss/**/*.scss','!src/scss/vendor/**/*.scss'])
    .pipe(sassLint({
      options:{
      	formatter: 'stylish'
      },
      rules: {
        'final-newline': 0,
        'indentation': 0,
        'no-css-comments': 0,
        'quotes': 0,
        'property-sort-order': 0,
        'variable-name-format':0
      },
      config: '../scss-lint.yml'
    }))
    .pipe(sassLint.format())
    .on('error', handleErrors);
});