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
        this.ddd.transitionTo(date.getDay(), firstReflow);
        this.dd.transitionTo(date.getDate(), firstReflow);
        this.mmm.transitionTo(date.getMonth(), firstReflow);
        this.hh.transitionTo(date.getHours(), firstReflow);
        this.mm.transitionTo(date.getMinutes(), firstReflow);
        this.ss.transitionTo(date.getSeconds(), firstReflow);
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
