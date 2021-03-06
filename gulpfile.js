(function(console) {
  'use strict';

  var gulp = require('gulp');
  var concat = require('gulp-concat');
  var rename = require('gulp-rename');
  var uglify = require('gulp-uglify');
  var sourcemaps = require('gulp-sourcemaps');
  var templateCache = require('gulp-angular-templatecache');
  var sass = require('gulp-sass');
  var mainBowerFiles = require('main-bower-files');
  var del = require('del');
  var zip = require('gulp-zip');

  var io = require('socket.io');

  // hook to the extension reloader
  var WEB_SOCKET_PORT = 8890;

  gulp.task('initSocket', function() {
    io = io.listen(WEB_SOCKET_PORT);
  });

  gulp.task('extension-reload', function() {
    io.emit('file.change', {});
  });

  gulp.task('bower', function() {
    var src = mainBowerFiles();
    src.push('./node_modules/socket.io-client/socket.io.js');

    return gulp.src(src)
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('dibs/dist'))
      .pipe(rename('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dibs/dist'))
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
      'dibs/socket.js',
      'dibs/injector.js'
    ])
      .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dibs/dist'));
  });

  gulp.task('sass', function() {
    return gulp.src('dibs/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('app.css'))
      .pipe(gulp.dest('dibs/dist'));
  });

  gulp.task('clean:extension', function() {
    return del([
      'extension/**/*.*'
    ]);
  });

  gulp.task('build:extension', ['clean:extension', 'bower', 'javascript', 'sass'], function() {
    var manifest = require('./manifest.json');
    var name = manifest.name;
    var version = manifest.version;
    var filename = [name, '-', version, '.zip'].join('');
    
    return gulp.src([
      'dibs/dist/app.css',
      'dibs/dist/app.js',
      'dibs/dist/vendor.min.js',
      'dibs/injector.js',
      'dibs/loader.js',
      'icons/**/*.*',
      'matrix-scrolling/**/*.*',
      'options/**/*.*',
      'manifest.json'
    ], {base: './'})
      .pipe(zip(filename))
      .pipe(gulp.dest('extension'));
  });

  gulp.task('watch', function() {
    var reloadWatcher = gulp.watch([
      './manifest.json',
      'dibs/loader.js',
      'dibs/dist/**/*.*',
      'options/**/*.*',
      'matrix-scrolling/**/*.*'
    ], ['extension-reload']);
    reloadWatcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', reloading extension');
    });

    gulp.watch('bower_components/**/*.*', ['bower']);
    gulp.watch(['dibs/loader.js', 'dibs/injector.js', 'dibs/socket.js', 'dibs/src/**/*.js'], ['javascript']);
    gulp.watch('dibs/src/**/*.html', ['javascript']);
    gulp.watch('dibs/**/*.scss', ['sass']);
  });

  gulp.task('default', ['initSocket', 'watch']);

})(global.console);