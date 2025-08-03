import SplitFlap from "../split-flap.js";

export default class SecondSplitFlap extends SplitFlap {
    constructor(element) {
        super(element, 0, 59, function (n) {
            let ss = String(n).padStart(2, '0');
            return `<span class="nn" data-number="${ss}">${ss}</span>`;
        });
    }
}
