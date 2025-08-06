/*jshint devel: true */

// Wake Lock API
let wakeLock = null;

const requestWakeLock = async () => {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active');

        // Re-request if the wake lock is released (e.g., screen off/on)
        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock was released');
        });
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
};

export default function initPwa() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('pwa-sw.js').then(() => {
            console.log('Service Worker Registered');
        });
    }

    // Request on page load
    if ('wakeLock' in navigator) {
        requestWakeLock();

        // Re-request on visibility change
        document.addEventListener('visibilitychange', () => {
            if (wakeLock !== null && document.visibilityState === 'visible') {
                requestWakeLock();
            }
        });
    } else {
        console.warn('Wake Lock API not supported');
    }
}
