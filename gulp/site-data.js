import { globSync }  from 'glob';
import { EXCLUDE_PARTIALS, PAGE_BASE_URL } from './constants.js';

export default function createSiteData() {
    const obj = globSync(['src/data/**/*.json', ...EXCLUDE_PARTIALS])
          .reduce(
              (accum, next) => Object.assign(accum, next),
              {}
          );
    obj.cacheBuster = Date.now();
    Object.assign(obj, {
        pageBaseUrl: PAGE_BASE_URL,
    });
    return obj;
}
