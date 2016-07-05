(function(console) {
  'use strict';

  var gulp = require('gulp');
  var concat = require('gulp-concat');
  var sourcemaps = require('gulp-sourcemaps');
  var templateCache = require('gulp-angular-templatecache');
  var sass = require('gulp-sass');

  var io = require('socket.io');

  // hook to the extension reloader
  var WEB_SOCKET_PORT = 8890;

  gulp.task('initSocket', function() {
    io = io.listen(WEB_SOCKET_PORT);
  });

  gulp.task('extension-reload', function() {
    io.emit('file.change', {});
  });


  gulp.task('templates', function() {
    return gulp.src('dibs/src/**/*.html')
      .pipe(templateCache('templates.js', {
        module: 'dibs',
        moduleSystem: 'IIFE'
      }))
      .pipe(gulp.dest('dibs/dist'));
  });

  gulp.task('javascript', ['templates'], function() {
    return gulp.src([
      'dibs/src/app.js',
      'dibs/dist/templates.js',
      'dibs/src/**/*.js',
      'dibs/loader.js'
    ])
      .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dibs/dist'));
  });

  gulp.task('sass', function() {
    return gulp.src('dibs/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('app.css'))
      .pipe(gulp.dest('dibs/dist'));
  });

  gulp.task('watch', function() {
    var reloadWatcher = gulp.watch([
      './manifest.json',
      'dibs/injector.js',
      'dibs/dist/**/*.*'
    ], ['extension-reload']);
    reloadWatcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', reloading extension');
    });

    gulp.watch(['dibs/loader.js', 'dibs/src/**/*.js'], ['javascript']);
    gulp.watch('dibs/src/**/*.html', ['javascript']);
    gulp.watch('dibs/**/*.scss', ['sass']);
  });

  gulp.task('default', ['initSocket', 'watch']);

})(global.console);