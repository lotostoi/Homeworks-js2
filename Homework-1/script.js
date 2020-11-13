'use strict';

let footerCopyBlock = document.querySelector('.footer-copyright p'),
    headBlockClock = document.querySelector('.header-clock');

let date = new Date();
footerCopyBlock.insertAdjacentHTML('beforeend', date.getFullYear()); // Добавляет текущий год в разметку

// Выводит время на экран
let time = setInterval(function() {
  const date = new Date();
  headBlockClock.innerHTML= (`${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`);
}, 1000);