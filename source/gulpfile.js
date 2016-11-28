var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");
var minify = require('gulp-clean-css');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
    return gulp.src('scss/app.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: sassPaths,
            // outputStyle: 'compressed' // if css compressed **file size**
        })
        .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe($.sourcemaps.write('../'))
        .pipe(gulp.dest('../css/app/'))
        .pipe(browserSync.reload({ stream: true }));
});

    gulp.task('browser-sync', function() {
        browserSync.init({
            proxy: "http://jam.dev:8888/"
        });
    });

    gulp.task('compress', function (cb) {
        pump([
                gulp.src('../js/app/*.js'),
                uglify(),
                rename({ suffix: '.min'}),
                gulp.dest('../js')
            ],
            cb
        );
    });

    gulp.task('compress-sass', ['sass'], function() {
        return gulp.src('../css/app/app.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest('../css'));
    });

    gulp.task('serve', ['sass', 'compress', 'compress-sass'], function() {

        
        browserSync.init({
            proxy: "http://jam.dev:8888/"
        });

        // gulp.watch(['scss/**/*.scss'], ['sass']).on('change', browserSync.reload);
        gulp.watch(['scss/**/*.scss'], ['sass', 'compress', 'compress-sass']);
        gulp.watch(['../css/*.css']).on('change', browserSync.reload);
        gulp.watch(['../js/app/*.js'], ['compress']);
        gulp.watch(['../js/*.js']).on('change', browserSync.reload);
        gulp.watch(["../*.html"]).on('change', browserSync.reload);
        

        
    });


gulp.task('default', ['serve']);

// gulp.task('default', ['sass'], function() {
//     gulp.watch(['scss/**/*.scss'], ['sass']);
// });
