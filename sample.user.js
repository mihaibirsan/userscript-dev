// ==UserScript==
// @name         Userscript Dev Sample
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Prepends the current date and time, plus a manual counter. Used to test the userscript development environment.
// @author       Mihai Bîrsan
// @match        http://localhost:3000/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const el = document.createElement('div');
    el.innerHTML = `
      ${new Date()} - sample.user.js<br>
      2 - increment and save to test - sample.user.js
    `;

    document.body.prepend(el);

    return () => document.body.removeChild(el);
})();
