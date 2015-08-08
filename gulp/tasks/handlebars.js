var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename');

var options = {
    ignorePartials: true,
    batch : ['./src/markup/partials'],
    helpers: {}
};

gulp.task('handlebars', function() {
    return gulp.src('./src/markup/templates/*.hbs')
        .pipe(handlebars(null, options))
        .pipe(rename(function(path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('handlebars:watch', function() {
    gulp.watch('src/markup/**/*.hbs', ['handlebars']);
});
