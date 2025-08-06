import gulp from 'gulp';
import babel from '@rollup/plugin-babel';
import * as rollup from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import { DIST } from './constants.js';

export function rollupBuild1() {
    return rollup
        .rollup({ input: 'src/scripts/split-flap/clock-page.js',
                  plugins: [resolve(), babel({ babelHelpers: 'bundled' })] })
        .then(bundle => {
            const filename = `./${DIST}/split-flap/scripts/main.js`;
            return bundle.write({
                file: filename,
                format: 'umd',
                name: 'library',
            });
        });
}

export function rollupBuild2() {
    return rollup
        .rollup({ input: 'src/scripts/split-flap/pwa-sw.js',
                  plugins: [resolve(), babel({ babelHelpers: 'bundled' })] })
        .then(bundle => {
            const filename = `./${DIST}/split-flap/scripts/pwa-sw.js`;
            return bundle.write({
                file: filename,
                format: 'umd',
                name: 'library',
            });
        });
}

const rollupTask = gulp.parallel(rollupBuild1, rollupBuild2);

export default rollupTask;
