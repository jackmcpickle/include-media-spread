import gulp from 'gulp';
import concat from 'gulp-concat';
import sassLint from 'gulp-sass-lint';
import sass from 'gulp-sass';
import del from 'del';

const _paths = {
    scss: './src/**/*.scss',
    build: './dist',
    build_scss: './src/*.*',
    dist_file: '_spread.scss',
    tests: './test/all.scss',

    includes: [
        'node_modules/sass-true/sass',
        'node_modules/include-media/dist'
    ]
};

export const merge = () =>
    gulp.src(_paths.build_scss)
        .pipe(concat(_paths.dist_file))
        .pipe(gulp.dest(_paths.build));

export const lintStyles = () =>
    gulp.src(_paths.scss)
        .pipe(sassLint())
        .pipe(sassLint.format());


export const clean = del.bind([_paths.build]);

export const test = () =>
    gulp.src(_paths.tests)
        .pipe(sass({
            includePaths: _paths.includes
        }))
        .pipe(gulp.dest(_paths.build));


export default gulp.series(clean, lintStyles, merge);
