import _ from 'lodash';

export default function dataToSass(value) {
    return Object.keys(value).map(key => `$${_.kebabCase(key)}: ${valueToSass(value[key])};\n`).join('');
}

function valueToSass(value) {
    if (Array.isArray(value)) {
        return '(' + value.map(v => valueToSass(v)).join(', ') + ')';
    }
    if (_.isPlainObject(value)) {
        return '(' + Object.keys(value).map(key => `${_.kebabCase(key)}: ${valueToSass(value[key])}`).join(', ') + ')';
    }
    if (value === '') {
        return '""';
    }
    return value;
}
