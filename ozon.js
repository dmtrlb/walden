// ==UserScript==
// @name         Скрытие рекомендаций OZON
// @namespace    http://tampermonkey.net/
// @version      2026-03-07
// @description  try to take over the world!
// @author       You
// @match        https://www.ozon.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ozon.ru
// @grant        none
// ==/UserScript==

function hideWallpaper() {
  // Получить все элементы с data-widget="wallpaper"
  const wallpaperElements = document.querySelectorAll('[data-widget="wallpaper"]');

  // Итерировать по каждому wallpaper элементу
  for (let wallpaper of wallpaperElements) {
    // Найти первый элемент с data-widget="island" внутри wallpaper
    const firstIsland = wallpaper.querySelector('[data-widget="island"]');

    // Если первый island найден
    if (firstIsland) {
      // Найти второй элемент с data-widget="island" внутри первого island
      const secondIsland = firstIsland.querySelector('[data-widget="skuGridSimple"]');

      // Если второй island найден, скрыть wallpaper
      if (secondIsland) {
        wallpaper.style.display = 'none';
        return true; // Успешное завершение
      }
    }
  }

  return false; // Элемент не найден
}

const hiddenItems = [
    'Кредитная карта',
    'Мои компании',
    'Моя семья',
    'Мой гараж',
    'Для меня',
    'Сообщения',
    'Мои отзывы',
    'Акция «Баллы за отзывы»',
    'Мои вопросы и ответы',
    'Вопросы, ожидающие ответа',
    'OZON Travel',
    'Ozon Premium',
];

function hideMenuItems() {
  document.querySelectorAll('[data-widget="menu"] a').forEach(link => {
    const text = link.textContent.replace(/\d+/g, '').trim();
    if (hiddenItems.includes(text)) {
      link.style.display = 'none';
    }
  });
}

function hideRecommendationsInOrder() {
  document.querySelectorAll('[data-widget="island"]').forEach(el => {
    const spans = el.querySelectorAll('span');
    for (const span of spans) {
      if (span.textContent.includes('Рекомендации к вашим покупкам')) {
        el.style.display = 'none';
        break;
      }
    }
  });
}

function hideRecommendationsInGood() {
  document.querySelectorAll('[data-widget="skuShelfGoods"], [data-widget="skuGrid"], [data-widget="skuGridSimple"]').forEach(el => {
    const spans = el.querySelectorAll('span');
    for (const span of spans) {
      if (span.textContent.includes('Рекомендуем также') || span.textContent.includes('Покупают вместе') || span.textContent.includes('Подобрали для вас') || span.textContent.includes('Подобрано для вас') || span.textContent.includes('Возможно, вам понравится') || span.textContent.includes('Вы смотрели')) {
        el.style.display = 'none';
        break;
      }
    }
  });
}

/**
 * Найти элемент с data-widget="caption" и текстом "Вы смотрели"
 * и скрыть следующий элемент с data-widget="skuShelfGoods"
 */
function hideViewedSection() {
  // Получить все элементы с data-widget="caption"
  const captionElements = document.querySelectorAll('[data-widget="caption"]');

  // Итерировать по каждому элементу
  for (let caption of captionElements) {
    // Проверить, содержит ли текст элемента "Вы смотрели"
    if (caption.textContent.includes('Вы смотрели')) {
      // Скрыть сам заголовок
      caption.style.display = 'none';

      // Найти следующий элемент с data-widget="skuShelfGoods"
      let nextElement = caption.nextElementSibling;

      // Если следующий элемент не найден или это не нужный элемент,
      // искать дальше по соседним элементам
      while (nextElement) {
        if (nextElement.getAttribute('data-widget') === 'skuShelfGoods') {
          // Скрыть найденный элемент
          nextElement.style.display = 'none';
          return true; // Успешное завершение
        }
        nextElement = nextElement.nextElementSibling;
      }
    }
  }

  return false; // Элемент не найден
}

function hideAnnotationBlock() {
  // Получить все элементы с data-widget="annotation"
  const annotationElements = document.querySelectorAll('[data-widget="annotation"]');

  // Итерировать по каждому элементу
  for (let annotation of annotationElements) {
    // Проверить, содержит ли текст элемента "рекомендательные технологии"
    if (annotation.textContent.includes('рекомендательные технологии')) {
      // Скрыть найденный элемент
      annotation.style.display = 'none';
      return true; // Успешное завершение
    }
  }

  return false; // Элемент не найден
}

function hideTagListInGood() {
  document.querySelectorAll('[data-widget="tagList"]').forEach(el => {
    const spans = el.querySelectorAll('h2');
    for (const span of spans) {
      if (span.textContent.includes('Подборки товаров')) {
        el.style.display = 'none';
        break;
      }
    }
  });
}

function hideAdBannerInGood() {
  document.querySelectorAll('[data-widget="bannerCarousel"]').forEach(el => {
    el.style.display = 'none';
  });
}

function hideAll() {
    hideWallpaper()
    hideMenuItems()
    hideRecommendationsInOrder()
    hideRecommendationsInGood()
    hideTagListInGood()
    hideAdBannerInGood()
    hideViewedSection()
    hideAnnotationBlock()
}

(function() {
    'use strict';

    const observer = new MutationObserver(hideAll);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    document.addEventListener('DOMContentLoaded', hideAll);

    hideAll();
})();