var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    cp          = require('child_process'),
    jade        = require('gulp-jade');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};



/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});


/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});




/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jade', 'jade-pages', 'sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});



gulp.task('sass', function () {
  gulp.src('assets/css/main.scss')
    .pipe(sass({includePaths: ['css'],outputStyle: 'compressed'}).on('error', browserSync.notify))
    .pipe(gulp.dest('assets/css'))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});



/*
* Compile jade
*/

gulp.task('jade', function(){
  return gulp.src('_jadefiles/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('_includes'));
});

gulp.task('jade-pages', function(){
  return gulp.src('_pagesjade/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('pages'));
});

/**
 * Watching files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch('assets/js/**', ['jekyll-rebuild']);
    gulp.watch('_posts/*/*.md', ['jekyll-rebuild']);
    gulp.watch(['index.html', '_layouts/*.html', '_includes/*','pages/*.html'], ['jekyll-rebuild']);
    gulp.watch('_jadefiles/*.jade', ['jade']);
    gulp.watch('_pagesjade/*.jade', ['jade-pages']);
});




/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
