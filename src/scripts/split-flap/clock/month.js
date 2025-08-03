import SplitFlap from "../split-flap.js";

export default class MonthSplitFlap extends SplitFlap {
    constructor(element) {
        super(element, 0, 11, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    }
}
