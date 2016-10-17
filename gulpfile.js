var gulp = require('gulp');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
var merge = require('merge-stream');
var clean = require('gulp-clean');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const spritesmith = require('gulp.spritesmith');
const texturepacker = require('spritesmith-texturepacker');

const paths = {
  dist: 'build/',
  assets: 'src/assets/',
  sprites: 'src/assets/sprites/',
  css: 'src/css/',
  cssimages: 'src/css/**/*.png',
}

gulp.task('clean', () => {
  return gulp.src(paths.dist)
   .pipe(clean({force: true}))
    .on('error', gutil.log);
});

gulp.task('copy', ['clean'], () => {
  gulp.src(paths.assets + '**')
  .pipe(gulp.dest(`${paths.dist}assets`))
  .on('error', gutil.log);

  gulp.src(paths.assets + '**')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{
      removeViewBox: false,
    }],
    use: [pngquant()],
  }))
  .pipe(gulp.dest(`${paths.dist}assets`))
  .on('error', gutil.log);

  gulp.src(paths.cssimages)
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{
      removeViewBox: false,
    }],
    use: [pngquant()],
  }))
  .pipe(gulp.dest(`${paths.dist}css`))
  .on('error', gutil.log);

  gulp.src(paths.css + '**')
  .pipe( postcss([ autoprefixer, cssnano ]) )
  .pipe(gulp.dest(`${paths.dist}css`))
  .on('error', gutil.log);
});


gulp.task('sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src(paths.sprites + '*.png').pipe(spritesmith({
    imgName: 'sprites.png',
    cssName: 'sprites.json',
    algorithm: 'binary-tree',
    cssTemplate: texturepacker
  }));


  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(assets));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest(assets));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

gulp.task('webpack', (callback) => {
  const webpackConfigProd = require('./webpack.config.prod.js');
  // run webpack
  webpack(webpackConfigProd, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({
      // output options
    }));
    callback();
  });
});

gulp.task('dev', (cb) =>{
  const webpackConfig = require('./webpack.config.js');
  var compiler = webpack(webpackConfig);

  new webpackDevServer(compiler, {
    contentBase: './src/',
    host: '0.0.0.0'
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    // keep the server alive or continue?
    cb();
  });
})

gulp.task('default', ['clean', 'copy', 'webpack']);
