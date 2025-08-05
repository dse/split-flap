import { Transform } from 'node:stream';

export default function messenger(thing) {
    return new Transform({
        objectMode: true,
        transform(data, enc, callback) {
            console.log(`${thing}: ${data.path}`);
            callback(null, data);
        }
    });
}
