// ==UserScript==
// @name         Link to LibreDMM
// @namespace    https://github.com/junzh0u/tampermonkey/
// @version      0.0.2
// @description  Link text that looks like AV code to LibreDMM page
// @author       Jun Zhou
// @match        http*://www.sehuatang.org/thread*
// @match        http*://www.sehuatang.org/forum.php?mod=viewthread&tid=*
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll('#thread_subject').forEach(function(subject){
        var m = subject.textContent.match(/\w+-\d+/);
        if (m) {
            var a = '<a href="https://www.libredmm.com/search?q=' + m[0] + '">' + m[0] + '</a>';
            subject.innerHTML = subject.innerHTML.replace(m[0], a);
        }
    });
})();
