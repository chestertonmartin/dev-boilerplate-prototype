var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    gutil = require('gulp-util'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var entries = [
    './src/js/app.js'
];

var b,
    initialized = false;

function bundle() {
    return b
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest('./build/js'));
}

gulp.task('javascript:browserify', function() {
    b = browserify({
        entries: entries
    });

    bundle();
});

gulp.task('javascript:browserify:watch', function() {
    b = watchify(browserify({
        entries: entries
    }));

    b.on('log', gutil.log);
    b.on('update', bundle);

    bundle();
});

gulp.task('javascript:hint', function() {
    return gulp.src([
        './src/js/**/*.js',
        '!./src/js/modernizr/**/*'
    ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('javascript:hint:watch', function() {
    gulp.watch([
        'src/js/**/*.js',
        '!src/js/modernizr/**/*'
    ], ['javascript:hint']);
});

gulp.task('javascript:modernizr', function() {
    return gulp.src('./src/js/modernizr/**/*')
        .pipe(gulp.dest('./build/js'));
});

gulp.task('javascript:modernizr:watch', function() {
    gulp.watch('src/js/modernizr/**/*', ['javascript:modernizr']);
});
