
// This shell script reloads the userscript every this there is a change in the
// original file.

(function() {
    'use strict';

    const SHELL_HOST = 'http://localhost:3000';
    const POLL_INTERVAL = 667;
    let prevMtime = null;
    let prevResult = null;

    const pollIntervalId = setInterval(function() {
      GM_xmlhttpRequest({
          method: "GET",
          url: `${SHELL_HOST}/mtime`,
          onload: function(response) {
              const mtime = response.responseText;
              if (mtime !== prevMtime) {
                  prevMtime = mtime;
                  // NOTE: May need to clearInterval and await
                  reloadScript();
              }
          }
      });
    }, POLL_INTERVAL);

    async function reloadScript() {
      // The result of the eval might be a promise
      prevResult = await prevResult;
      if (typeof prevResult === 'function') {
          // The result of the eval might be a function that returns a promise
          await prevResult();
          prevResult = null;
      }

      GM_xmlhttpRequest({
          method: "GET",
          url: `${SHELL_HOST}/userscript.js`,
          onload: function(response) {
              prevResult = eval(response.responseText);
          }
      });
    }

    return () => clearInterval(pollIntervalId);
})();