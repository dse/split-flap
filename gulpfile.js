/*global console */

import autoprefixer  from 'autoprefixer';
import browsersync   from 'browser-sync';
import babel         from '@rollup/plugin-babel';
import * as dartSass from 'sass';
import gulp          from 'gulp';
import gulpSass      from 'gulp-sass';
import postcss       from 'gulp-postcss';
import resolve       from '@rollup/plugin-node-resolve';
import * as rollup   from 'rollup';

const sass = gulpSass(dartSass);
let server;

function sassTask() {
    console.log(`sassTask: executing`);
    return gulp.src('src/styles/app.scss')
               .pipe(sass())
               .pipe(postcss([autoprefixer]))
               .pipe(gulp.dest('dist/styles'));
}

function htmlTask() {
    console.log(`htmlTask: executing`);
    return gulp.src('src/pages/**/*.html')
               .pipe(gulp.dest('dist'));
}

function rollupTask() {
    console.log(`rollupTask: executing`);
    return rollup
        .rollup({ input: 'src/scripts/clock-page.js',
                  plugins: [resolve(), babel({ babelHelpers: 'bundled' })] })
        .then(bundle => {
            console.log(`rollupTask: generating bundle`);
            return bundle.write({
                file: './dist/scripts/app.js',
                format: 'umd',
                name: 'library',
            });
        });
}

function serverTask() {
    // never completes
    if (server) {
        return;
    }
    console.log(`serverTask: starting server`);
    server = browsersync.create();
    server.init({
        server: './dist',
    });
}

function reloadTask(cb) {
    console.log(`reloadTask: reloading server`);
    if (server) {
        server.reload();
    }
    cb();
}

function watchTask() {
    // never completes
    console.log(`watchTask: watching files`);
    gulp.watch('src/pages/**/*.html', gulp.series(htmlTask, reloadTask));
    gulp.watch('src/styles/**/*.scss', gulp.series(sassTask, reloadTask));
    gulp.watch('src/scripts/**/*.js', gulp.series(rollupTask, reloadTask));
}

const buildTask = gulp.parallel(sassTask, htmlTask, rollupTask);

const devTask = gulp.series(
    gulp.parallel(sassTask, htmlTask, rollupTask),
    gulp.parallel(serverTask, watchTask),
);

export { rollupTask as rollup };
export { sassTask   as sass   };
export { htmlTask   as html   };
export { buildTask  as build  };
export { devTask    as dev    };
