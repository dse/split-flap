if (!Promise.withResolvers) {
    Promise.withResolvers = function () {
        const obj = {};
        obj.promise = new Promise((res, rej) => {
            obj.resolve = res;
            obj.reject = rej;
        });
        return obj;
    };
}

export default class RollCall {
    constructor(total) {
        this.total = total;
        this.count = 0;
        const { promise, resolve } = Promise.withResolvers();
        Object.assign(this, { promise, resolve });
        this.values = [];
        this.trueValues = [];
        this.falseValues = [];
    }
    checkIn(value) {
        if (this.count >= this.total) {
            return false;
        }
        this.count += 1;
        this.values.push(value);
        this[value ? "trueValues" : "falseValues"].push(value);
        if (this.count >= this.total) {
            this.resolve(this.values);
        }
        return true;
    }
    allCounted() {
        return this.promise;
    }
    countOf(value) {
        if (typeof value === 'function') {
            return this.values.filter(v => value(v)).length;
        }
        return this.values.filter(v => v === value).length;
    }
    once(fn) {
        if ("_once" in this) {
            return;
        }
        this._once = fn();
    }
    retval() {
        return this._once;
    }
}
