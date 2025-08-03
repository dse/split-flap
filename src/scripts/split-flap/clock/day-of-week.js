import SplitFlap from "../split-flap.js";

export default class DayOfWeekSplitFlap extends SplitFlap {
    constructor(element) {
        super(element, 0, 6, ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    }
}
