var gulp = require('gulp');

gulp.task('default', [
    'sass',
    'javascript:browserify',
    'javascript:hint',
    'javascript:modernizr',
    'handlebars',
    'images',
    'fonts'
]);
