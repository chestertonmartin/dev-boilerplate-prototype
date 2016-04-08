var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    layouts = require('handlebars-layouts'),
    rename = require('gulp-rename'),
    fs = require('fs');

var options = {
    ignorePartials: true,
    batch : ['./src/markup/partials'],
    helpers: {}
},
    templateDataDirectory = './src/data';


handlebars.Handlebars.registerHelper(layouts(handlebars.Handlebars));

function getTemplateData() {
    var data= {},
        files,
        file;

    files = fs.readdirSync(templateDataDirectory);

    files.forEach(function(file) {
        if (file !== '.DS_Store') {
            data[file.replace('.json', '')] = JSON.parse(fs.readFileSync(templateDataDirectory + '/' + file, 'utf-8'));
        }
    });

    return data;
}

gulp.task('handlebars', function() {
    var templateData = getTemplateData();

    return gulp.src('./src/markup/templates/*.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename(function(path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('handlebars:watch', function() {
    gulp.watch('src/markup/**/*.hbs', ['handlebars']);
});
