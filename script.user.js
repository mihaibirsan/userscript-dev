
(function() {
    'use strict';

    const el = document.createElement('div');
    el.innerHTML = `
      ${new Date()} - script.user.js<br>
      2 - increment and save to test - script.user.js
    `;

    document.body.appendChild(el);

    return () => document.body.removeChild(el);
})();
