var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin');

gulp.task('sass', function () {
    gulp.src('./src/scss/style.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 8 versions', 'ie 8', 'ie 9']
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
});
