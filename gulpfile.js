import autoprefixer  from 'autoprefixer';
import browsersync   from 'browser-sync';
import babel         from '@rollup/plugin-babel';
import gulp          from 'gulp';
import gulpSass      from 'gulp-sass';
import postcss       from 'gulp-postcss';
import resolve       from '@rollup/plugin-node-resolve';
import * as rollup   from 'rollup';
import * as dartSass from 'sass';
import source        from 'vinyl-source-stream';

const sass = gulpSass(dartSass);
let server;

function sassTask() {
    return gulp.src('src/styles/app.scss')
               .pipe(sass())
               .pipe(postcss([autoprefixer]))
               .pipe(gulp.dest('dist/css'));
}

function htmlTask() {
    return gulp.src('src/pages/**/*.html')
               .pipe(gulp.dest('dist'));
}

function rollupTask() {
    return rollup
        .rollup({ input: 'src/scripts/clock-page.js',
                  plugins: [resolve(), babel({ babelHelpers: 'bundled' })] })
        .then(bundle => {
            return bundle.write({
                file: './dist/js/app.js',
                format: 'umd',
                name: 'library',
            });
        });
}

function serverTask(cb) {
    if (server) {
        return;
    }
    server = browsersync.create();
    server.init({
        server: './dist',
    });
}

function watchTask(cb) {
    gulp.watch('src/pages/**/*.html', htmlTask);
    gulp.watch('src/styles/**/*.scss', sassTask);
    gulp.watch('src/js/**/*.js', rollupTask);
}

const buildTask = gulp.parallel(sassTask, htmlTask, rollupTask);

const devTask = gulp.series(
    gulp.parallel(sassTask, htmlTask, rollupTask),
    gulp.parallel(serverTask, watchTask),
);

export { rollupTask as "rollup" };
export { sassTask   as "sass"   };
export { htmlTask   as "html"   };
export { buildTask  as "build"  };
export { devTask    as "dev"    };
