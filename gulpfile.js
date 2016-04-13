var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var result = 'build';


var paths = {
    scripts: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
        'node_modules/angular/angular.min.js',
        'src/scripts/**/*.js'],
    css: ['src/styles/*.css', 'node_modules/normalize.css/normalize.css']
};

gulp.task('styles', function() {
     return gulp.src(paths.css)
         .pipe(cleanCSS({compatibility: 'ie8'}))
         .pipe(concat('app.css'))
         .pipe(gulp.dest(result));
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(result));
});

gulp.task('default', ['scripts', 'styles']);