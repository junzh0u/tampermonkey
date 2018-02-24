// ==UserScript==
// @name         Baidu Pan Helper
// @namespace    https://github.com/junzh0u/tampermonkey/
// @version      0.1
// @description  Auto fill the password on URLs like https://pan.baidu.com/s/xxxxxx#PSWD
// @author       Jun Zhou
// @match        https://pan.baidu.com/*
// ==/UserScript==

(function() {
    'use strict';

    var hash = window.location.hash;
    if (hash) {
        document.querySelector('dl.pickpw input').setAttribute('value', hash.substring(1));
        document.querySelector('dl.pickpw a').click();
    }
})();
