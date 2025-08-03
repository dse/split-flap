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
import { Transform } from 'node:stream';
import colors        from '@colors/colors';
import path          from 'node:path';

const dist = isDev() ? '_dev/dist/web' : 'dist/web';
fs.mkdirSync(dist, { recursive: true });

const sass = gulpSass(dartSass);
let server;

const excludePartials = ['!**/_*', '!**/_*/**/*'];
const excludeTempFiles = ['!**/*~', '!**/#*'];

function createSiteData() {
    const obj = globSync(['src/data/**/*.json', ...excludePartials])
          .reduce(
              (accum, next) => Object.assign(accum, next),
              {}
          );
    obj.cacheBuster = Date.now();
    console.log(JSON.stringify(obj, null, 4));
    return obj;
}

function sassTask() {
    console.log(`sassTask: executing`);
    return gulp.src(['src/styles/**/*.scss', ...excludePartials])
               .pipe(messageGenerator('compiling'))
               .pipe(sass())
               //.pipe(postcss([autoprefixer]))
               .pipe(gulp.dest(`${dist}/split-flap/styles`))
               .pipe(messageGenerator('wrote'));
}

function htmlTask() {
    console.log(`htmlTask: executing`);
    return gulp.src(['src/pages/**/*.html', ...excludePartials])
               .pipe(messageGenerator('copying'))
               .pipe(gulp.dest(`${dist}`))
               .pipe(messageGenerator('wrote'));
}

function nunjucksTask() {
    return gulp.src(['src/pages/**/*.njk', ...excludePartials], { base: 'src/pages' })
               .pipe(messageGenerator('compiling'))
               .pipe(data(createSiteData))
               .pipe(nunjucks({ path: 'src/pages' }))
               .pipe(gulp.dest(`${dist}`))
               .pipe(messageGenerator('wrote'));
}

function rollupTask() {
    console.log(`rollupTask: executing`);
    return rollup
        .rollup({ input: 'src/scripts/split-flap/clock-page.js',
                  plugins: [resolve(), babel({ babelHelpers: 'bundled' })] })
        .then(bundle => {
            const filename = `./${dist}/split-flap/scripts/main.js`;
            console.log(colors.brightYellow(`rollupTask: generating ${path.resolve(filename)}`));
            return bundle.write({
                file: filename,
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
    cb?.();
}

function watchTask() {
    // never completes
    console.log(`watchTask: watching files`);
    gulp.watch(['src/pages/**/*.html', ...excludeTempFiles], gulp.series(htmlTask, reloadTask));
    gulp.watch(['src/pages/**/*.njk', ...excludeTempFiles], gulp.series(nunjucksTask, reloadTask));
    gulp.watch(['src/styles/**/*.scss', ...excludeTempFiles], gulp.series(sassTask, reloadTask));
    gulp.watch(['src/scripts/**/*.js', ...excludeTempFiles], gulp.series(rollupTask, reloadTask));
}

function staticTask() {
    return gulp.src(['public/**/*', ...excludePartials])
               .pipe(messageGenerator('copying'))
               .pipe(gulp.dest(`${dist}`))
               .pipe(messageGenerator('wrote'));
}

function cleanTask(cb) {
    fs.rmSync(`${dist}`, { recursive: true });
    cb?.();
}

const buildTask = gulp.series(
    cleanTask,
    gulp.parallel(sassTask, htmlTask, rollupTask, staticTask, nunjucksTask)
);

const devTask = gulp.series(
    gulp.parallel(sassTask, htmlTask, rollupTask, nunjucksTask),
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

function messageGenerator(thingy) {
    return new Transform({
        objectMode: true,
        transform(record, encoding, callback) {
            if (thingy === 'wrote') {
                console.log(colors.brightYellow(`${thingy} ${record.path}`));
            } else {
                console.log(colors.green(`${thingy} ${record.path}`));
            }
            this.push(record);
            callback(null);
        }
    });
}
