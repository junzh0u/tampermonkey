// ==UserScript==
// @name         POJ auto-login
// @namespace    https://github.com/junzh0u/tampermonkey/
// @version      1.1
// @description  Re-login to poj.org automatically whenever the session expires
// @author       Jun Zhou
// @match        http://poj.org/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @run-at       document-end
// ==/UserScript==

// Credentials live in Tampermonkey's per-script storage, not in this file:
// set them once via the Tampermonkey menu ("Set POJ credentials…") on any
// poj.org page. POJ is plain HTTP, so the password crosses the wire in
// cleartext on every normal login anyway.

(function () {
  'use strict';

  GM_registerMenuCommand('Set POJ credentials…', () => {
    const user = prompt('POJ user id:', GM_getValue('user_id', ''));
    if (!user) return;
    const pass = prompt('POJ password:');
    if (!pass) return;
    GM_setValue('user_id', user);
    GM_setValue('password', pass);
    alert('Saved. Reload the page to log in.');
  });
  GM_registerMenuCommand('Clear POJ credentials', () => {
    GM_deleteValue('user_id');
    GM_deleteValue('password');
  });

  // Logged-in pages carry a "Log Out" link; its absence means the session is gone.
  if (document.querySelector('a[href*="logout"]')) {
    sessionStorage.removeItem('poj-autologin-at');
    return;
  }

  const userId = GM_getValue('user_id', '');
  const password = GM_getValue('password', '');
  if (!userId || !password) {
    console.warn('[poj-autologin] credentials not set — use the Tampermonkey menu');
    return;
  }

  // One attempt per minute per tab — a wrong password otherwise loops forever.
  const last = Number(sessionStorage.getItem('poj-autologin-at') || 0);
  if (Date.now() - last < 60_000) {
    console.warn('[poj-autologin] recent attempt did not stick — check credentials');
    return;
  }
  sessionStorage.setItem('poj-autologin-at', String(Date.now()));

  const body = new URLSearchParams({
    user_id1: userId,
    password1: password,
    B1: 'login',
    url: location.pathname + location.search,
  });

  console.log('[poj-autologin] session expired, logging in as', userId);
  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    credentials: 'same-origin',
  }).then(() => location.reload());
})();
