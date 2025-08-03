'use strict';

console.log('This is special-start.js.');

/// if (isIpad() && isOldIos()) {
    window.addEventListener('error', function (event) {
        window.alert(
            "ERROR: " + event.message + "\n" +
                event.filename + ":" + event.lineno + ":" + event.colno + "\n" +
                JSON.stringify(event.error, null, 4)
        );
    });
// }

// if (isIpad() && isOldIos()) {
//     wrapConsoleLogFunctions();
// }
function isIpad() {
    return /\biPad\b/i.test(navigator.userAgent);
}
function isOldIos() {
    return /\b9_3_5\b/.test(navigator.userAgent);
}
function wrapConsoleLogFunctions() {
    var oldConsoleLog = console.log;
    var oldConsoleWarn = console.warn;
    var oldConsoleInfo = console.info;
    var oldConsoleDebug = console.debug;
    var oldConsoleError = console.error;
    var consoleLogElement = document.getElementById('consoleLogElement');
    if (!consoleLogElement) {
        return;
    }
    console.log = function () {
        consoleLogElement.innerHTML += "LOG: " + Array.from(arguments).join(" ") + "\n";
        oldConsoleLog.apply(this, arguments);
    };
    console.warn = function () {
        consoleLogElement.innerHTML += "WARN: " + Array.from(arguments).join(" ") + "\n";
        oldConsoleWarn.apply(this, arguments);
    };
    console.info = function () {
        consoleLogElement.innerHTML += "INFO: " + Array.from(arguments).join(" ") + "\n";
        oldConsoleInfo.apply(this, arguments);
    };
    console.debug = function () {
        consoleLogElement.innerHTML += "DEBUG: " + Array.from(arguments).join(" ") + "\n";
        oldConsoleDebug.apply(this, arguments);
    };
    console.error = function () {
        consoleLogElement.innerHTML += "ERROR: " + Array.from(arguments).join(" ") + "\n";
        oldConsoleError.apply(this, arguments);
    };
}
