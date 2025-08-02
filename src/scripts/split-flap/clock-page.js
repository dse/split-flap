import Clock from './clock.js';

let wakeLockObject;
function acquireWakeLock() {
    if (!('wakeLock' in navigator) || wakeLockObject) {
        return;
    }
    navigator.wakeLock.request('screen').then(function (wakeLock) {
        wakeLockObject = wakeLock;
        wakeLockObject.addEventListener('release', function () {
            wakeLockObject = null;
        });
    });
}
function releaseWakeLock() {
    if (!('wakeLock' in navigator) || !wakeLockObject) {
        return;
    }
    wakeLockObject.release();
    wakeLockObject = null;
}

let serviceWorker;
function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        return;
    }
    window.addEventListener('beforeinstallprompt', function (event) {
        event.preventDefault();
        window.deferredPrompt = event;
        if (document.readyState === 'complete') {
            $('#pwa').style.display = 'block';
        } else {
            window.addEventListener('load', function () {
                $('#pwa').style.display = 'block';
            });
        }
    });
    window.addEventListener('appinstalled', function (event) {
        window.deferredPrompt = null;
        if (document.readyState === 'complete') {
            $('#pwa').style.display = 'none';
        } else {
            window.addEventListener('load', function () {
                $('#pwa').style.display = 'none';
            });
        }
    });
    navigator.serviceWorker.register("service-worker.js", null).then(function (registration) {
        if (registration.installing) {
            serviceWorker = registration.installing;
        } else if (registration.waiting) {
            serviceWorker = registration.waiting;
        } else if (registration.active) {
            serviceWorker = registration.active;
        }
    });
}

function setupFromQueryString() {
    let sp = new URL(location.href).searchParams;
    if (sp.has('arial-black') || sp.has('arialBlack'))    { document.body.classList.add('clock-page--arial-black'); }
    if (sp.has('arial'))                                  { document.body.classList.add('clock-page--arial'); }
    if (sp.has('italic'))                                 { document.body.classList.add('clock-page--italic'); }
    if (sp.has('helvetica'))                              { document.body.classList.add('clock-page--helvetica'); }
    if (sp.has('times'))                                  { document.body.classList.add('clock-page--times'); }
    if (sp.has('futura'))                                 { document.body.classList.add('clock-page--futura'); }
    if (sp.has('helvboldcond') || sp.has('helvcondbold')) { document.body.classList.add('clock-page--helvetica-condensed-bold'); }
    let i;
    let timeWeight;
    let dateWeight;
    if (sp.has('bold'))                { dateWeight = 700; }
    if (sp.getAll('bold').length >= 2) { timeWeight = 700; }
    for (i = 100; i <= 900; i += 100) {
        if (sp.has(i)) {
            timeWeight = Math.min(timeWeight == null ?  Infinity : timeWeight, i);
            dateWeight = Math.max(dateWeight == null ? -Infinity : dateWeight, i);
        }
    }
    if (timeWeight != null) { document.body.classList.add('clock-page--time-' + timeWeight); }
    if (dateWeight != null) { document.body.classList.add('clock-page--date-' + dateWeight); }
    let fg = sp.get('fg');
    let bg = sp.get('bg');
    let frame = sp.get('frame');
    if (fg    != null && /^[0-9A-Za-z]{3}(?:[0-9A-Za-z]{3})?$/.test(fg))    { fg    = '#' + fg;    }
    if (bg    != null && /^[0-9A-Za-z]{3}(?:[0-9A-Za-z]{3})?$/.test(bg))    { bg    = '#' + bg;    }
    if (frame != null && /^[0-9A-Za-z]{3}(?:[0-9A-Za-z]{3})?$/.test(frame)) { frame = '#' + frame; }
    if (fg    != null) { $(':root').style.setProperty('--split-flap-color', fg); }
    if (bg    != null) { $(':root').style.setProperty('--split-flap-background-color', bg); }
    if (frame != null) { $(':root').style.setProperty('--frame-background-color', frame); }
    if (sp.has('font')) { $(':root').style.setProperty('--font-family', sp.get('font')); }
}

function setupPwa() {
    $$('[data-pwa-install]').forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
        });
    });
    $$('[data-pwa-dismiss]').forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            $('#pwa').style.display = 'none';
        });
    });
}

let clock;

function setupConsole() {
    let modal = $('#consoleModal');
    let toggle = $('#consoleToggle');
    let closeModal = $('#closeConsoleModal');
    let modalBackingLayer = $('#consoleModalBackingLayer');
    toggle.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = (modal.style.display !== 'none' &&
                               modal.style.display !== '') ? 'none' : 'block';
    });
    closeModal.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = 'none';
    });
    modalBackingLayer.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = 'none';
    });
}

function setupPrefs() {
    let modal = $('#prefsModal');
    let toggle = $('#prefsToggle');
    let closeModal = $('#closePrefsModal');
    let modalBackingLayer = $('#prefsModalBackingLayer');
    let form = $('#prefsForm');
    let twentyFourHourCheckbox = $('#twentyFourHourCheckbox');
    toggle.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = (modal.style.display !== 'none' &&
                                    modal.style.display !== '') ? 'none' : 'block';
    });
    closeModal.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = 'none';
    });
    modalBackingLayer.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = 'none';
    });
    form.addEventListener('submit', function (event) {
        event.preventDefault();
    });
    let twentyFourHour = JSON.parse(localStorage.getItem('twentyFourHour'));
    if (twentyFourHour == null) {
        twentyFourHour = false;
    }
    if (twentyFourHour) {
        clock.hh.setTwentyFourHour(twentyFourHour);
    }
    twentyFourHourCheckbox.addEventListener('change', function (event) {
        twentyFourHour = $('#twentyFourHourCheckbox').checked;
        clock.setTwentyFourHour(twentyFourHour);
        localStorage.setItem('twentyFourHour', JSON.stringify(twentyFourHour));
    });
}

window.addEventListener('load', function () {
    acquireWakeLock();
    registerServiceWorker();
    setupPwa();
    setupFromQueryString();
    clock = new Clock();
    setupPrefs();
    setupConsole();
    clock.start();
});

function $() {
    return document.querySelector.apply(this, arguments);
}

function $$() {
    return Array.from(document.querySelectorAll.apply(this, arguments));
}
