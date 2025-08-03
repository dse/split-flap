const REFLOW = false;

import Reflow from './reflow.js';

export class SplitFlap {
    constructor(element, start, end, strings) {
        if (!element) { throw new Error(`element not found`); }
        this.id = element.id;
        this.element = element;
        this.start = start;
        this.end = end;
        this.strings = [];
        if (Array.isArray(strings)) {
            this.strings = strings;
        } else if (strings instanceof Function) {
            for (let i = start; i <= end; i += 1) {
                this.strings.push(strings(i));
            }
        } else if (strings == null) {
            for (let i = start; i <= end; i += 1) {
                this.strings.push(i);
            }
        }
        this.topElement = this.element.querySelector('[data-top]');
        this.bottomElement = this.element.querySelector('[data-bottom]');
        this.transitionTopElement = this.element.querySelector('[data-transition-top]');
        this.transitionBottomElement = this.element.querySelector('[data-transition-bottom]');
        this.state = start;
        this.targetState = start;
        this.update();
    }
    async transition(firstReflow) {
        if (this.state === this.targetState) {
            this.transitioning = false;
            if (REFLOW) {
                firstReflow.tick(false);
            }
            return;
        }
        let nextState = (this.state - this.start + 1) % this.strings.length + this.start;
        let currentState  = this.state;
        let currentString = this.strings[this.state - this.start];
        let nextString    = this.strings[nextState - this.start];
        this.transitionTopElement.innerHTML = currentString;
        this.transitionTopElement.setAttribute('data-state', currentState);
        this.topElement.innerHTML = nextString;
        this.topElement.setAttribute('data-state', nextState);
        this.transitionBottomElement.innerHTML = nextString;
        this.transitionBottomElement.setAttribute('data-state', nextState);
        this.transitionTopElement.classList.add('xx--start');
        this.transitionBottomElement.classList.add('xx--start');
        if (this.targetState !== nextState) {
            this.transitionTopElement.classList.add('xx--speedy');
            this.transitionBottomElement.classList.add('xx--speedy');
        }
        if (REFLOW) {
            firstReflow.tick(true);
        }
        let secondReflow;
        if (REFLOW) {
            await firstReflow.promise;
            firstReflow.reflow(this.element);
            secondReflow = (firstReflow.secondReflow =
                            firstReflow.secondReflow ??
                            new Reflow(firstReflow.trueCount));
        } else {
            this.reflow();
        }
        this.transitionTopElement.classList.add('xx--transition');
        this.transitionBottomElement.classList.add('xx--transition');
        let duration = Math.max(this.getTransitionDuration(this.transitionTopElement),
                                this.getTransitionDuration(this.transitionBottomElement));
        let handler1Executed = 0;
        let handler2Executed = 0;
        let timeout1;
        let timeout2;
        let thirdReflow;
        let finish = async function () {
            if (REFLOW) {
                secondReflow.tick();
                await secondReflow.promise;
                secondReflow.reflow(this.element);
                thirdReflow = (secondReflow.thirdReflow =
                               secondReflow.thirdReflow ??
                               new Reflow(firstReflow.trueCount));
            } else {
                this.reflow();
            }
            this.state = nextState;
            await this.transition(thirdReflow);
        }.bind(this);
        let handler1 = async function (event) {
            if (timeout1) {
                clearTimeout(timeout1);
                timeout1 = null;
            }
            if (handler1Executed++) {
                return;
            }
            this.transitionTopElement.removeEventListener('transitionend', handler1);
            this.transitionTopElement.removeEventListener('transitioncancel', handler1);
            this.transitionTopElement.classList.remove('xx--start', 'xx--transition', 'xx--speedy');
            if (handler1Executed && handler2Executed) {
                await finish();
            }
        }.bind(this);
        let handler2 = async function (event) {
            if (timeout2) {
                clearTimeout(timeout2);
                timeout2 = null;
            }
            if (handler2Executed++) {
                return;
            }
            this.transitionBottomElement.removeEventListener('transitionend', handler2);
            this.transitionBottomElement.removeEventListener('transitioncancel', handler2);
            this.bottomElement.innerHTML = nextString;
            this.bottomElement.setAttribute('data-state', nextState);
            this.transitionBottomElement.classList.remove('xx--start', 'xx--transition', 'xx--speedy');
            if (handler1Executed && handler2Executed) {
                await finish();
            }
        }.bind(this);
        this.transitionTopElement.addEventListener('transitionend', handler1);
        this.transitionTopElement.addEventListener('transitioncancel', handler1);
        this.transitionBottomElement.addEventListener('transitionend', handler2);
        this.transitionBottomElement.addEventListener('transitioncancel', handler2);

        // in case transition events fail...
        let ms = duration + 100;
        timeout1 = setTimeout(handler1, ms);
        timeout2 = setTimeout(handler2, ms);
    }
    async transitionTo(targetState, firstReflow) {
        this.targetState = targetState;
        if (this.transitioning) {
            if (REFLOW) {
                firstReflow.tick(false);
            }
            return;
        }
        if (this.state === this.targetState) {
            if (REFLOW) {
                firstReflow.tick(false);
            }
            return;
        }
        this.transitioning = true;
        await this.transition();
    }
    reflow() {
        /*jshint -W030 */
        this.element.offsetHeight;
        /*jshint +W030 */
    }
    getTransitionDuration(element) {
        let cs = window.getComputedStyle(element);
        return this.parseDuration(cs.transitionDuration) || this.parseDuration(cs.webkitTransitionDuration);
    }
    parseDuration(dur) {
        if (dur == null) {
            return null;
        }
        if (/ms$/.test(dur)) {
            return Number(dur.slice(0, -2));
        }
        if (/s$/.test(dur)) {
            return Number(dur.slice(0, -1)) * 1000;
        }
        return 0;
    }

    // You call this after changing 12/24 hour setting and such.
    // This can execute during transitions.
    update() {
        let state;
        let string;
        if (this.topElement.hasAttribute('data-state')) {
            state = parseInt(this.topElement.getAttribute('data-state'), 10);
            string = isNaN(state) ? '' : this.strings[state - this.start];
            this.topElement.innerHTML = string;
        } else {
            string = this.strings[this.state - this.start];
            this.topElement.innerHTML = string;
        }
        if (this.bottomElement.hasAttribute('data-state')) {
            state = parseInt(this.bottomElement.getAttribute('data-state'), 10);
            string = isNaN(state) ? '' : this.strings[state - this.start];
            this.bottomElement.innerHTML = string;
        } else {
            string = this.strings[this.state - this.start];
            this.bottomElement.innerHTML = string;
        }
        if (this.transitionTopElement.hasAttribute('data-state')) {
            state = parseInt(this.transitionTopElement.getAttribute('data-state'), 10);
            string = isNaN(state) ? '' : this.strings[state - this.start];
            this.transitionTopElement.innerHTML = string;
        }
        if (this.transitionBottomElement.hasAttribute('data-state')) {
            state = parseInt(this.transitionBottomElement.getAttribute('data-state'), 10);
            string = isNaN(state) ? '' : this.strings[state - this.start];
            this.transitionBottomElement.innerHTML = string;
        }
    }
}

SplitFlap.counter = 0;

export class DayOfMonthSplitFlap extends SplitFlap {
    constructor(element) {
        super(element, 1, 31, function (d) {
            return `<span class="nn" data-number="${d}">${d}</span>`;
        });
    }
}
export class MonthSplitFlap extends SplitFlap {
    constructor(element) {
        super(element, 0, 11, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    }
}
export class DayOfWeekSplitFlap extends SplitFlap {
    constructor(element) {
        super(element, 0, 6, ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    }
}
export class HourSplitFlap extends SplitFlap {
    constructor(element, options) {
        super(element, 0, 23);
        if (options != null && options.twentyFourHour) {
            this.setTwentyFourHour();
        } else {
            this.setTwelveHour();
        }
    }
    update() {
        let h;
        if (this.twentyFourHour) {
            this.strings = [];
            for (h = 0; h < 24; h += 1) {
                this.strings.push(twentyFourHourString(h));
            }
        } else {
            this.strings = [];
            for (h = 0; h < 24; h += 1) {
                this.strings.push(twelveHourString(h));
            }
        }
        super.update();
    }
    setTwelveHour(flag) {
        if (flag == null) { flag = true; }
        this.twentyFourHour = !flag;
        this.update();
    }
    setTwentyFourHour(flag) {
        if (flag == null) { flag = true; }
        this.twentyFourHour = flag;
        this.update();
    }
}
function twelveHourString(h) {
    let h12 = (h + 11) % 12 + 1;
    return `<span class="nn hh" data-number="${h12}">${h12}</span>` +
        ((h < 12) ? '<span class="ampm am">am</span>' :
         '<span class="ampm pm">pm</span>');
}
function twentyFourHourString(h) {
    let hh = String(h).padStart(2, '0');
    return `<span class="nn" data-number="${hh}">${hh}</span>`;
}
export class MinuteSplitFlap extends SplitFlap {
    constructor(element) {
        super(element, 0, 59, function (n) {
            let mm = String(n).padStart(2, '0');
            return `<span class="nn" data-number="${mm}">${mm}</span>`;
        });
    }
}
export class SecondSplitFlap extends SplitFlap {
    constructor(element) {
        super(element, 0, 59, function (n) {
            let ss = String(n).padStart(2, '0');
            return `<span class="nn" data-number="${ss}">${ss}</span>`;
        });
    }
}
