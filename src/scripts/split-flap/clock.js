import {
    MonthSplitFlap,
    DayOfMonthSplitFlap,
    DayOfWeekSplitFlap,
    HourSplitFlap,
    MinuteSplitFlap,
    SecondSplitFlap,
} from './split-flap.js';

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
        const data = {};
        this.ddd.transitionTo(date.getDay(), data);
        this.dd.transitionTo(date.getDate(), data);
        this.mmm.transitionTo(date.getMonth(), data);
        this.hh.transitionTo(date.getHours(), data);
        this.mm.transitionTo(date.getMinutes(), data);
        this.ss.transitionTo(date.getSeconds(), data);
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
