// ==UserScript==
// @name         Userscript Dev Shell
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://localhost:*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    console.log('Userscript Dev Shell');

    GM_xmlhttpRequest({
        method: "GET",
        url: "http://localhost:3000/script.user.js",
        onload: function(response) {
            eval(response.responseText);
        }
    });

    // Your code here...
})();