export default function init() {
    if (/\biPad\b|\biPhone\b/i.test(navigator.userAgent)) {
        window.addEventListener('error', function (event) {
            window.alert(`${event.type}: ${event.message}`);
        });
    }
}
