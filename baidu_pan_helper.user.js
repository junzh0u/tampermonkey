// ==UserScript==
// @name         Baidu Pan Helper
// @namespace    https://github.com/junzh0u/tampermonkey/
// @version      0.1.2
// @description  Automations for BaiduPan:
//               1. On URL like https://pan.baidu.com/s/xxxxxx#PSWD, auto fill password and submit.
//               2. Then auto save all files (to root path).
// @author       Jun Zhou
// @match        https://pan.baidu.com/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

$(document).ready(function() {
    if ($('dl.pickpw').length && window.location.hash) {
        console.log('fill password')
        $('dl.pickpw input').attr('value', window.location.hash.substring(1));
        console.log('submit')
        $('dl.pickpw a').click();
    } else if ($('span:contains("保存到网盘")').length) {
        console.log('select all')
        $('span:contains("全选"):first').click()
        setTimeout(function() {
            console.log('click save')
            $('span:contains("保存到网盘"):first').click()
            setTimeout(function() {
                console.log('confirm')
                $('span:contains("确定"):first').click()
            }, 1000)
        }, 1000)
    }
});
