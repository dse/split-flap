import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import jsonImporter from 'node-sass-json-importer';
import messenger from './util/messenger.js';
import getSiteData from './site-data.js';
// import path from 'node:path';
// import fs from 'node:fs';

import { DIST, EXCLUDE_PARTIALS, PAGE_BASE_URL } from './constants.js';

const sass = gulpSass(dartSass);

const sassConfig = {
    convertCase: true,
    load: jsonImporter(),
};

export default function sassTask() {
    const siteData = getSiteData();
    return gulp.src(['src/styles/**/*.scss', ...EXCLUDE_PARTIALS])
               .pipe(messenger('sass'))
               .pipe(sass(sassConfig))
    // .pipe(postcss([autoprefixer]))
               .pipe(gulp.dest(`${DIST}${PAGE_BASE_URL}/styles`));
}
