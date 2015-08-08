var gulp = require('gulp');

gulp.task('images', function() {
    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./build/img'));
});

gulp.task('images:watch', function() {
    gulp.watch('src/img/**/*', ['images']);
});
