/*jshint devel: true */

export default class SplitFlap {
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
    async transition() {
        if (this.state === this.targetState) {
            this.transitioning = false;
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
        const speedy = this.targetState !== nextState;
        if (speedy) {
            this.transitionTopElement.classList.add('xx--speedy');
            this.transitionBottomElement.classList.add('xx--speedy');
        }
        this.reflow();
        this.transitionTopElement.classList.add('xx--transition');
        this.transitionBottomElement.classList.add('xx--transition');
        let duration = Math.max(this.getTransitionDuration(this.transitionTopElement),
                                this.getTransitionDuration(this.transitionBottomElement));
        let handler1Executed = 0;
        let handler2Executed = 0;
        let timeout1;
        let timeout2;
        let finish = async function () {
            this.reflow();
            this.state = nextState;
            await this.transition();
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
    async transitionTo(targetState) {
        this.targetState = targetState;
        if (this.transitioning) {
            return;
        }
        if (this.state === this.targetState) {
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
