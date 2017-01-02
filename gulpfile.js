var browserSync = require('browser-sync').create();
var gulp        = require('gulp'),
    shell       = require('gulp-shell'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer');

// Task for building site when something changed:
// gulp.task('build', shell.task(['bundle exec jekyll build --watch']));
// Or if you don't use bundle:
gulp.task('build', shell.task(['jekyll build --watch']));

// Task for serving site with Browsersync
gulp.task('browser-sync',['sass'], function () {
    browserSync.init({
      server: {baseDir: '_site/'},
      open: false
    });
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});


gulp.task('sass', function () {
  return gulp.src('assets/css/master.scss')
     .pipe(sass({includePaths: ['css'],outputStyle: 'compressed'}).on('error', browserSync.notify))
    .pipe(prefix({browsers: ['last 2 versions'], cascade: true}))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/css'));
});


/**
 * Watching files for changes & recompile
 * Watch html/md, sass/css files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['build' ,'browser-sync', 'watch']);
