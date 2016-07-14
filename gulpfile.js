'use strict';

/**
 * Import plugins
 */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),
    del = require('del');

/**
 * Build vendors dependencies
 */
gulp.task('vendors', function() {

  /**
   * CSS VENDORS
   */
  gulp.src([
        'bower_components/swiper/dist/idangerous.swiper.css',
        'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
        'bower_components/owl.carousel/dist/assets/owl.theme.default.min.css'
      ])
      .pipe($.concat('vendors.css'))
      .pipe($.minifyCss())
      .pipe(gulp.dest('build/css'));

  /**
   * JS VENDORS
   * - Bootstrap dependencies first
   * - we do not load jquery as we use jqueryUpdate
   */

  gulp.src([
      //'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
      'bower_components/fitvids/jquery.fitvids.js',
      'bower_components/iCheck/icheck.min.js',
      'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
      'bower_components/packery/dist/packery.pkgd.min.js',
      'bower_components/swiper/dist/idangerous.swiper.min.js',
      'assets/js/vendors/idangerous.swiper.scrollbar.min.js',
      'bower_components/owl.carousel/dist/owl.carousel.min.js',
      'bower_components/jsrender/jsrender.min.js',
      'bower_components/moment/min/moment.min.js',
      'bower_components/moment/min/locales.min.js',
      'bower_components/moment/min/moment-with-locales.min.js'
     ])
    .pipe($.concat('vendors.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));

  /**
   * IMG
   */
  gulp.src([
      'bower_components/uww-flags/flags/**/*'
    ])
    .pipe(gulp.dest('build/img/flags'));

  /**
   * FONTS SOURCES
   * Important to add the bootstrap fonts to avoid issues with the fonts include path
   */
  gulp.src([
      'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
      'assets/fonts/**/*'
    ])
    .pipe(gulp.dest('build/fonts'));
});

/**
 * Build styles from SCSS files
 * With error reporting on compiling (so that there's no crash)
 */
gulp.task('styles', function() {
  return gulp.src('assets/sass/uww.scss')
    .pipe($.rubySass({
      container: 'local_sass'
    }))
    .on('error', $.util.beep)
    .on('error', $.notify.onError(function (error) {
      return 'Message to the notifier: ' + error.message;
    }))
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe($.minifyCss())
    .pipe(gulp.dest('build/css'));
});

/**
 * Build JS
 */
gulp.task('scripts', function() {
  return gulp.src('assets/js/*.js')
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('build/js'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));
});

/**
 * Lint JS
 */

 gulp.task('jshint', function () {
   return gulp.src('assets/js/*js')
     .pipe($.jshint())
     .pipe($.jshint.reporter('jshint-stylish'))
     .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
 });

/**
 * Build Hologram Styleguide
 */
gulp.task('styleguide', function () {
  return gulp.src('hologram_config.yml')
    .pipe($.hologram());
});

/**
 * Clean output directories
 */
gulp.task('clean', del.bind(null, ['build', 'styleguide']));

/**
 * Serve
 */
gulp.task('serve', ['styles'], function () {
  browserSync({
    server: {
      baseDir: ['styleguide'],
    },
    open: false
  });
  gulp.watch(['**/*.html'], reload);
  gulp.watch(['assets/sass/**/*.scss'], function() {
    runSequence('styles', 'styleguide', reload);
  });
});

/**
 * Deploy to GH pages
 */

gulp.task('deploy', function () {
  return gulp.src("styleguide/**/*")
    .pipe($.ghPages());
});

/**
 * Default task
 */
gulp.task('default', ['clean'], function(cb) {
  runSequence('vendors', 'styles', 'scripts', 'styleguide', cb);
});

