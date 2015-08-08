var gulp = require('gulp');

gulp.task('fonts', function() {
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('fonts:watch', function() {
    gulp.watch('src/fonts/**/*', ['fonts']);
});
