const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('generators/', { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('build', function () {
    return gulp.src('src/**/templates/**/*')
        .pipe(gulp.dest('generators'));  
});

gulp.task('default', gulp.series('clean', 'build'));
