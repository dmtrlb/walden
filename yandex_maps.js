// ==UserScript==
// @name         Яндекс карты
// @namespace    http://tampermonkey.net/
// @version      2026-03-08
// @description  try to take over the world!
// @author       You
// @match        https://maps.yandex.ru/*
// @match        https://yandex.ru/maps/*
// @match        https://yandex.com/maps/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

function hideStoriesBusiness() {
 document.querySelectorAll('.business-stories-view__carousel').forEach(el => {
        el.style.display = 'none';
    });
}

function hideAll() {
    hideStoriesBusiness()
}

(function() {
    'use strict';



    const observer = new MutationObserver(hideAll);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    hideAll();
})();