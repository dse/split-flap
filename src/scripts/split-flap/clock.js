import {
    MonthSplitFlap,
    DayOfMonthSplitFlap,
    DayOfWeekSplitFlap,
    HourSplitFlap,
    MinuteSplitFlap,
    SecondSplitFlap,
} from './split-flap.js';
import Reflow from './reflow.js';

export default class Clock {
    constructor() {
        this.id = "clock";
        this.mmm = new MonthSplitFlap(document.getElementById('month'));
        this.ddd = new DayOfWeekSplitFlap(document.getElementById('dayOfWeek'));
        this.dd = new DayOfMonthSplitFlap(document.getElementById('dayOfMonth'));
        this.hh = new HourSplitFlap(document.getElementById('hours'));
        this.mm = new MinuteSplitFlap(document.getElementById('minutes'));
        this.ss = new SecondSplitFlap(document.getElementById('seconds'));
    }
    setTwentyFourHour(flag) {
        this.hh.setTwentyFourHour(flag);
    }
    setTwelveHour(flag) {
        this.hh.setTwelveHour(flag);
    }
    update() {
        let date = new Date();
        const firstReflow = new Reflow(6);
        this.ddd.goTo(date.getDay(), firstReflow);
        this.dd.goTo(date.getDate(), firstReflow);
        this.mmm.goTo(date.getMonth(), firstReflow);
        this.hh.goTo(date.getHours(), firstReflow);
        this.mm.goTo(date.getMinutes(), firstReflow);
        this.ss.goTo(date.getSeconds(), firstReflow);
    }
    start() {
        if (this.timeout) {
            return;
        }
        this.update();
        let ms = 1000 - Date.now() % 1000;
        this.timeout = setTimeout(function () {
            this.timeout = null;
            this.start();
        }.bind(this), ms);
    }
}
