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

    const SHELL_HOST = 'http://localhost:3000';
    const POLL_INTERVAL = 667;
    let prevMtime = null;

    setInterval(function() {
      GM_xmlhttpRequest({
          method: "GET",
          url: `${SHELL_HOST}/mtime`,
          onload: function(response) {
              const mtime = response.responseText;
              if (mtime !== prevMtime) {
                  prevMtime = mtime;
                  reloadScript();
              }
          }
      });
    }, POLL_INTERVAL);

    function reloadScript() {
      GM_xmlhttpRequest({
          method: "GET",
          url: `${SHELL_HOST}/script.user.js`,
          onload: function(response) {
              eval(response.responseText);
          }
      });
    }

    // Your code here...
})();