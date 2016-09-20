
var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');

var spritesmith = require('gulp.spritesmith');
var texturepacker = require('spritesmith-texturepacker');

gulp.task('sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src('src/assets/animales/toro/*.png').pipe(spritesmith({
    imgName: 'toro.png',
    cssName: 'toro.json',
    algorithm: 'binary-tree',
    cssTemplate: texturepacker
  }));


  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('src/assets/animales/toro/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest('src/assets/animales/toro/'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

/*var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var texturepacker = require('spritesmith-texturepacker');

gulp.task('sprites', function() {
    var spriteData = gulp.src('img/*.png')
        .pipe(spritesmith({
            imgName: 'sprites.png',
            cssName: 'sprites.json',
            algorithm: 'binary-tree',
            cssTemplate: texturepacker
    }));
    spriteData.img.pipe(imagemin()).pipe(gulp.dest('build/'));
    spriteData.css.pipe(gulp.dest('build/'));
});
*/
