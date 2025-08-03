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
        var date = new Date();
        this.ddd.transitionTo(date.getDay());
        this.dd.transitionTo(date.getDate());
        this.mmm.transitionTo(date.getMonth());
        this.hh.transitionTo(date.getHours());
        this.mm.transitionTo(date.getMinutes());
        this.ss.transitionTo(date.getSeconds());
    }
    start() {
        if (this.timeout) {
            return;
        }
        this.update();
        var ms = 1000 - Date.now() % 1000;
        this.timeout = setTimeout(function () {
            this.timeout = null;
            this.start();
        }.bind(this), ms);
    }
}
