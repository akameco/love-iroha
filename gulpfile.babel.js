import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import uglify from 'gulp-uglify'
import nodemon from 'gulp-nodemon'

gulp.task('browserify', () => {
  browserify('./client/js/index.js', { degug: true })
    .transform(babelify)
    .bundle()
    .on("error", err => { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'lib/index.js',
    ext: 'js ejs'
  });
});

gulp.task('watch', () => {
  gulp.watch(['./client/js/**/*'], ['browserify'])
});

gulp.task('default', ['browserify', 'watch', 'nodemon']);
