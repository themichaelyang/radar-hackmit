'use strict';

let gulp = require('gulp');
let babel = require("gulp-babel");
let sourcemaps = require('gulp-sourcemaps');
let del = require('del');
let exec = require('child_process').exec;

let appDir = 'app';

function processJavascript(source, destination) { //, isProduction) {
  return gulp.src(source)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', e => {
      console.log(e.stack);
      exec('say '+e.name); // says the error name
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destination));
}

gulp.task('build-js', function() {
  return processJavascript('js/**/*.js', appDir+'/js/');
});

gulp.task('build-html', function() {
  return copyFiles('*.html', appDir);
});
gulp.task('copy-polyfill', function() {
  del(appDir+'js/vendor');
  return copyFiles('node_modules/babel-polyfill/dist/polyfill.min.js', appDir+'/js/vendor');
});

gulp.task('copy-adapter', function() {
  del(appDir+'js/vendor');
  return copyFiles('node_modules/webrtc-adapter/out/adapter.js', appDir+'/js/vendor');
});

gulp.task('build', ['build-js', 'build-html', 'copy-polyfill', 'copy-adapter']);

gulp.task('copy-libraries', function() {
  del(appDir+'js/vendor');
  return copyFiles('node_modules/babel-polyfill/dist/polyfill.min.js', appDir+'/js/vendor');
});

function copyFiles(source, destination) {
  return gulp.src(source)
    .pipe(gulp.dest(destination));
}

gulp.task('watch', ['build'], function() {
  var watcher = gulp.watch('js/*', ['build-js']);
  watcher.on('change', function(event) {
    console.log('File "' + event.path + '" was ' + event.type + ', running tasks...');
  });
});
