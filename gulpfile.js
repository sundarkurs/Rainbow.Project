var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var header = require('gulp-header');

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask