// text блок откуда берем исходный текст
let text = document.querySelector('.text p').innerText;
// textContainer блок, куда вставим полученный текст с двойными кавычками
let textContainer = document.querySelector('.text-container');

// Регулярное выражение найдет все кавычки:
let regexp = new RegExp('\'', 'g');
// создаю элемент "p"
let creatEl = document.createElement("p");
// меняю одинарные кавычки на двойные
creatEl.textContent = text.replace(/\B'|'\B/g, '\"');
// вставляю полученный параграф в разметку
textContainer.appendChild(creatEl);