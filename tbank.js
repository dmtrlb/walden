// ==UserScript==
// @name         Скрытие лишних блоков Т-Банк
// @namespace    http://tampermonkey.net/
// @version      2026-03-07
// @description  try to take over the world!
// @author       You
// @match        https://*.tbank.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

function hideCashbackMainPage() {
  document.querySelectorAll('[data-qa-type="desktop-bonuses-entrypoint"]').forEach(el => {
    const spans = el.querySelectorAll('a');
    for (const span of spans) {
      if (span.textContent.includes('Кэшбэк и бонусы')) {
        el.style.display = 'none';
        break;
      }
    }
  });
}

function hideBlocksMainPageMobile() {
  document.querySelectorAll('[data-qa-type="independent-ib-toggle-expander"], [data-qa-type="mobile-general-ib-header"]').forEach(el => {
    const spans = el.querySelectorAll('h1');
    for (const span of spans) {
      if (span.textContent.includes('Пульс') || span.textContent.includes('Шопинг')) {
        el.style.display = 'none';
        break;
      }
    }
  });
}

function hideCashbackBonusesPage() {
  document.querySelectorAll('[data-qa-type="desktop-bonuses-offer-categories"], [data-qa-type="desktop-bonuses-popular-brands"], [data-qa-type="desktop-bonuses-smart-feed"], [data-qa-type="mobile-myauto-spheres-entrypoint-home_sphere"], [data-qa-type="mobile-shopping-sphere-entrypoint-banner"], [data-qa-type*="ls-sdui-shelf_1_groceryMain"]').forEach(el => {
      el.style.display = 'none';
  });
}

function hideBlocksCityMobile() {
    document.querySelectorAll('a[href*="/gorod/fuel"]').forEach(link => {
        if (link.querySelector('header')) {
            const parent = link.closest('[data-qa-type="tui/transition"]');
            if (parent) parent.style.display = 'none';
        }
    });
}

function hideBlocksCityPage() {
  document.querySelectorAll('[aria-label="Перейти в сервис T-Shop"], [aria-label="Перейти в сервис Долями Медиа"], [aria-label="Перейти в сервис Купить авто"], [aria-label="Перейти в сервис Отслеживание посылок"]').forEach(el => {
      el.style.display = 'none';
  });
}

function hideAll() {
    hideBlocksMainPageMobile()
    hideCashbackMainPage()
    hideCashbackBonusesPage()
    hideBlocksCityPage()
    hideBlocksCityMobile()
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