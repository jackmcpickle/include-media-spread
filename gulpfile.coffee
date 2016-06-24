gulp         = require 'gulp'
concat       = require 'gulp-concat'
clean        = require 'gulp-clean'
sassLint     = require 'gulp-sass-lint'
sass         = require 'gulp-sass'
runSequence  = require 'run-sequence'

_paths = {
  scss: './src/**/*.scss'
  build: './dist'
  build_scss: './src/*.*'
  dist_file: '_spread.scss'
  tests: './test/all.scss'

  includes: [
    'node_modules/sass-true/sass'
    'node_modules/include-media/dist'
  ]
}

gulp.task 'merge', ->
  gulp.src _paths.build_scss
  .pipe concat _paths.dist_file
  .pipe gulp.dest _paths.build

gulp.task 'sassLint', ->
  gulp.src(_paths.scss)
  .pipe sassLint()
  .pipe sassLint.format()

gulp.task 'clean', ->
  gulp.src _paths.build, read: false
  .pipe clean()

gulp.task 'test', ->
  gulp.src _paths.tests
  .pipe sass
    includePaths: _paths.includes
  .pipe gulp.dest _paths.build


gulp.task 'lint', ['sassLint']

gulp.task 'build', ->
  runSequence 'clean', 'sassLint', 'merge'

gulp.task 'default', ['build']
