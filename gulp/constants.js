const DEV_MODE = getDevMode();
const EXCLUDE_PARTIALS = ['!**/_*', '!**/_*/**/*'];
const EXCLUDE_TEMP_FILES = ['!**/*~', '!**/#*'];
const DIST = DEV_MODE ? '_dev/dist/web' : 'dist/web';

// Base URL for flip clock page.
// DO NOT APPEND A TRAILING SLASH.  FOR DOCUMENT ROOT USE AN EMPTY STRING.
const PAGE_BASE_URL = '/split-flap';

function getDevMode() {
    const env = process.env.NODE_ENV;
    return env === "dev" || (env != null && env !== 'production');
}

export {
    EXCLUDE_PARTIALS,
    EXCLUDE_TEMP_FILES,
    DEV_MODE,
    DIST,
    PAGE_BASE_URL,
};
