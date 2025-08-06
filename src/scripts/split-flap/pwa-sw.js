/*jshint devel: true */
/*global self */

self.addEventListener('install', (e) => {
    console.log('Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    console.log('Service Worker activated');
});

