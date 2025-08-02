/*global console */

import autoprefixer  from 'autoprefixer';
import browsersync   from 'browser-sync';
import babel         from '@rollup/plugin-babel';
import * as dartSass from 'sass';
import data          from 'gulp-data';
import fs            from 'node:fs';
import gulp          from 'gulp';
import gulpSass      from 'gulp-sass';
import postcss       from 'gulp-postcss';
import resolve       from '@rollup/plugin-node-resolve';
import * as rollup   from 'rollup';
import nunjucks      from 'gulp-nunjucks-render';
import { globSync }  from 'glob';

const dist = isDev() ? '_dev/dist' : 'dist';
fs.mkdirSync(dist, { recursive: true });

const sass = gulpSass(dartSass);
let server;

function createSiteData() {
    const obj = globSync('src/data/**/*.json').reduce(
        (accum, next) => Object.assign(accum, next),
        {}
    );
    obj.cacheBuster = Date.now();
    console.log(JSON.stringify(obj, null, 4));
    return obj;
}

function sassTask() {
    console.log(`sassTask: executing`);
    return gulp.src('src/styles/app.scss')
               .pipe(sass())
               .pipe(postcss([autoprefixer]))
               .pipe(gulp.dest(`${dist}/styles`));
}

function htmlTask() {
    console.log(`htmlTask: executing`);
    return gulp.src('src/pages/**/*.html')
               .pipe(data(createSiteData))
               .pipe(nunjucks({ path: 'src/pages' }))
               .pipe(gulp.dest(`${dist}`));
}

function nunjucksTask() {
    return gulp.src('src/pages/**/*.njk')
               .pipe(nunjucks())
               .pipe(gulp.dest(`${dist}`));
}

function rollupTask() {
    console.log(`rollupTask: executing`);
    return rollup
        .rollup({ input: 'src/scripts/clock-page.js',
                  plugins: [resolve(), babel({ babelHelpers: 'bundled' })] })
        .then(bundle => {
            console.log(`rollupTask: generating bundle`);
            return bundle.write({
                file: `./${dist}/scripts/app.js`,
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
        server: ['public', `${dist}`]
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

function staticTask() {
    return gulp.src('public/**/*').pipe(gulp.dest(`${dist}`));
}

const buildTask = gulp.parallel(sassTask, htmlTask, rollupTask, staticTask);

const devTask = gulp.series(
    gulp.parallel(sassTask, htmlTask, rollupTask),
    gulp.parallel(serverTask, watchTask),
);

export { rollupTask   as rollup   };
export { sassTask     as sass     };
export { htmlTask     as html     };
export { buildTask    as build    };
export { devTask      as dev      };
export { staticTask   as static   };
export { nunjucksTask as nunjucks };

function isDev() {
    const env = process.env.NODE_ENV;
    return env === "dev" || (env != null && env !== 'production');
}
