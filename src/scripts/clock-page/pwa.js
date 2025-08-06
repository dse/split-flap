/*jshint devel: true */

// Button should be hidden initially:
//
//     <button id="installBtn" hidden>Install App</button>
//
function initInstallButton() {
    console.debug(`initInstallButton: executing`);

    // Install button handling
    let deferredPrompt;
    const installBtn = document.getElementById('installBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
        console.debug(`initInstallButton: beforeinstallprompt handler executing`);
        // Prevent the default install prompt
        e.preventDefault();
        deferredPrompt = e;

        // Show the install button
        installBtn.hidden = false;
    });

    installBtn.addEventListener('click', async () => {
        console.debug(`initInstallButton: click handler executing`);
        if (!deferredPrompt) {
            return;
        }

        deferredPrompt.prompt(); // Show the install prompt
        const { outcome } = await deferredPrompt.userChoice;

        console.log(`User response to install prompt: ${outcome}`);
        deferredPrompt = null;
        installBtn.hidden = true;
    });
}

export default function initPwa() {
    console.debug(`initPwa: executing`);

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('scripts/pwa-sw.js').then(() => {
            console.log('initPwa: Service Worker Registered');
        });
    }

    // Wake Lock API
    let wakeLock = null;

    const requestWakeLock = async () => {
        console.debug(`initPwa: requestWakeLock: executing`);
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

    initInstallButton();
}
