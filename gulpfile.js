import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import squoosh from 'gulp-libsquoosh';
import rename from 'gulp-rename';
import del from 'del';

//styleForDev

const stylesDev = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//del

const cleaner = () => {
  return del('build');
}

// Scripts

const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

//html

const html = () => {
  return gulp.src('source/*html')
  .pipe(gulp.dest('build'));
}

// Fonts

const fonts = () => {
  return gulp.src('source/fonts/*.{woff2,woff}')
  .pipe(gulp.dest('build/fonts'));
}

//IMG

const images = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
}

//COPY IMAGES

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'));
}

// WebP

const createWebp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'))
}

// SVG

const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
    // .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

const svg = () => {
  return gulp.src('source/img/**/*.svg')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload
const reload = (done) => {
  browser.reload ();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(stylesDev, reload));
  gulp.watch('source/js/*.js', gulp.series(scripts, reload));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

export const build = gulp.series(
  cleaner,
  gulp.parallel(
    html,
    images,
    svg,
    stylesDev,
    fonts,
    sprite,
    createWebp,
    scripts
  )
);

export default gulp.series(
  cleaner,
  gulp.parallel(
    html,
    copyImages,
    svg,
    stylesDev,
    fonts,
    sprite,
    createWebp,
    scripts
  ),
  gulp.series(
    server,
    watcher
));
