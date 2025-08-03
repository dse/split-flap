import SplitFlap from "../split-flap.js";

export default class DayOfMonthSplitFlap extends SplitFlap {
    constructor(element) {
        super(element, 1, 31, function (d) {
            return `<span class="nn" data-number="${d}">${d}</span>`;
        });
    }
}
