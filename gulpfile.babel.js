import {src, dest, series} from 'gulp';
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
    src(_paths.build_scss)
        .pipe(concat(_paths.dist_file))
        .pipe(dest(_paths.build));

export const lintStyles = () =>
    src(_paths.scss)
        .pipe(sassLint())
        .pipe(sassLint.format());


export const clean = (done) => { del([_paths.build]).then(() => done()) }

export const test = () =>
    src(_paths.tests)
        .pipe(sass({
            includePaths: _paths.includes
        }))
        .pipe(dest(_paths.build));


export default series(clean, lintStyles, merge);
