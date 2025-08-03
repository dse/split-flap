import SplitFlap from "../split-flap.js";

export default class MinuteSplitFlap extends SplitFlap {
    constructor(element) {
        super(element, 0, 59, function (n) {
            let mm = String(n).padStart(2, '0');
            return `<span class="nn" data-number="${mm}">${mm}</span>`;
        });
    }
}
