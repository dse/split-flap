/*global console */

let idCounter = 0;
let reflowCount = 0;

export default class Reflow {
    constructor(ticks) {
        this.id = idCounter;
        idCounter += 1;
        // console.log(`Reflow #${this.id}: initializing with ${ticks} ticks`);
        this.ticks = ticks;
        this.tickCount = 0;
        this.promise = new Promise((resolve, reject) => {
            // console.log(`Reflow #${this.id}: promise created`);
            this.resolve = resolve;
            resolve();
        });
        this.reflowCompleted = false;
        this.trueCount = 0;
        this.falseCount = 0;
    }
    tick(bool) {
        // console.log(`Reflow #${this.id}: ticking`);
        new Promise((resolve, reject) => resolve()).then(() => {
            if (this.tickCount >= this.ticks) {
                return;
            }
            this.tickCount += 1;
            // console.log(`Reflow #${this.id}: new tickCount is ${this.tickCount} of ${this.ticks}`);
            if (bool) {
                this.trueCount += 1;
            } else {
                this.falseCount += 1;
            }
            if (this.tickCount >= this.ticks) {
                this.resolve();
            }
        });
    }
    reflow(elt) {
        if (this.reflowCompleted) {
            // console.log(`Reflow #${this.id}: reflow already triggered`);
            return false;
        }
        reflowCount += 1;
        console.log(`Reflow #${this.id}: triggering reflow #${reflowCount}`);
        this.reflowCompleted = true;
        void elt.offsetHeight;  // triggers the reflow
        return true;
    }
}
