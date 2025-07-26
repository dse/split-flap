// DEMO

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
        // this.mmm.delay = 83;
        // this.ddd.delay = 66;
        // this.dd.delay = 50;
        // this.hh.delay = 33;
        // this.mm.delay = 16;
        // this.mm.delay = 1;
    }
    setTwentyFourHour(flag) {
        this.hh.setTwentyFourHour(flag);
    }
    setTwelveHour(flag) {
        this.hh.setTwelveHour(flag);
    }
    update() {
        let date = new Date();
        this.ddd.goTo(date.getDay());
        this.dd.goTo(date.getDate());
        this.mmm.goTo(date.getMonth());
        this.hh.goTo(date.getHours());
        this.mm.goTo(date.getMinutes());
        this.ss.goTo(date.getSeconds());
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
