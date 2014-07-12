// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var rename = require('gulp-rename');

gulp.task('sass', function() {
  gulp.src('app/sass/pfo.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    .pipe(rename({
        basename: 'style',
        extname: ".css"
      }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('compress', function() {
  gulp.src([
    'app/libs/angular.js',
    'app/libs/*.js',
    'app/libs/vendor/*.js',
    'app/js/app.js',
    'app/js/services/*.js',
    'app/js/controllers/*.js',
    'app/js/filters/*.js',
    'app/js/directives/*.js'
  ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('watch', function() {
  gulp.watch('app/sass/*.scss', ['sass']);
  gulp.watch(['app/**/*.js', '!app/js/app.min.js', '!app/libs/vendor'], ['compress']);
});

gulp.task('default', ['sass', 'compress', 'watch']);