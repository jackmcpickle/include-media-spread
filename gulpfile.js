const gulp         = require('gulp');
const concat       = require('gulp-concat');
const sassLint     = require('gulp-sass-lint');
const sass         = require('gulp-sass');
const runSequence  = require('run-sequence');

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

gulp.task( 'merge', () => {
  return gulp.src( _paths.build_scss )
  .pipe( concat( _paths.dist_file ) )
  .pipe( gulp.dest( _paths.build ) );
});

gulp.task( 'sassLint', () => {
  return gulp.src( _paths.scss )
  .pipe( sassLint() )
  .pipe( sassLint.format() );
});

gulp.task('clean', require('del').bind(null, [_paths.build]));


gulp.task( 'test', () => {
  return gulp.src( _paths.tests )
  .pipe( sass({
    includePaths: _paths.includes
  }) )
  .pipe( gulp.dest(_paths.build) );
});


gulp.task( 'lint', ['sassLint'] );

gulp.task( 'build', () => {
  runSequence( 'clean', 'sassLint', 'merge');
});

gulp.task( 'default', ['build'] );
