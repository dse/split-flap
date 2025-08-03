import SplitFlap from "../split-flap.js";

export default class HourSplitFlap extends SplitFlap {
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
