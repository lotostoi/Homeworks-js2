window.addEventListener('load', () => {

//  ES6 ///////////////////////////////////////////////////////////////////////////////

  let searchBtn = document.querySelector('.input-search');

  /**
   * Получает объект с продуктом и отдает блок с разметкой
   */
  class Product {
    constructor(product) {
      this.title = product.title;
      this.price = product.price;
      this.img = product.img;
    }

    render() {
      return `<div class="product-block">
                <div class="product-block-img">
                  <img src="${this.img}" alt="${this.title}">
                </div>
                <div class="product-block-content">
                  <h2 class="product-block-title">
                    ${this.title}
                  </h2>
                  <p class="product-block-desc">
                    Этот товар получен с помощью ES6
                  </p>
                  <div class="product-block-quantity">
                    <p class="product__price">
                      ${this.price}
                    </p>
                    <div class="product-quant">
                      <button class="item-minus">-</button>
                      <span>1</span>
                      <button class="item-plus">+</button>
                    </div>
                    <div class="product-add-basket">
                      <img src="images/shopping-basket.svg" alt="В корзину">
                    </div>
                  </div>
                </div>
              </div>`;
    }
  }

  /**
   * blockProducts - блок в который нужно вставить полученную разметку из класса Product
   * allGoods - принимает нужный объект товаров
   */
  class ProductsList {
    constructor(blockProducts) {
      this.blockProducts = blockProducts;

      //Переделал класс. Поместил блок с товарами во внутрь
      this.goods = [
        {title: 'Телевизор Samsung', price: 42000, img: 'http://placehold.it/350x300'},
        {title: 'Iphone 12', price: 64000, img: 'http://placehold.it/350x300'},
        {title: 'Sony Playstation', price: 33000, img: 'http://placehold.it/350x300'},
        {title: 'MacBook Pro', price: 252000, img: 'http://placehold.it/350x300'},
      ];
    }

    /**
   * Функция делает вызов на сервер
   * @param {string} url 
   */
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.open('GET', url, true);

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) return;

          if(xhr.readyState === 4) {
            resolve(xhr.responseText);
          }
          
          if(xhr.status !== 200) {
            reject('Error!');
          }
        };
        
        xhr.send();
      }); 
    }


    /** TODO
     * Метод получает товар
     */
    fetchGoods(goodsObj) {
      this.goods.push({goodsObj});
      console.log(this.goods);
    }

    /**
     * Метод отрисовывает товар на странице
     */
    renderGoods() {
      this.goods.map((good) => {
        let productObject = new Product(good);
        document.querySelector(this.blockProducts).insertAdjacentHTML('beforeend', productObject.render());
      });
    }

    searchProduct() {
      searchBtn.form.addEventListener('submit', (e) => {
        e.preventDefault();
      });
      searchBtn.addEventListener('change', (e) => {
        let regexp = new RegExp(searchBtn.value, 'gi');
        this.goods.map((good, index) => {
          let result = regexp.test(good.title);
          if(result) {
            return blockProducts[index].style.display = '';
          } else {
            blockProducts[index].style.display = 'none';
          }
        });
      });
    }
  }

  let productApi = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';

  /** 
   * Запускаем класс ProductsList с параметрами:
   * 1.Блок куда нужно вставить полученную разметку
   * 2.Объект товаров
   */
  new ProductsList('.product-wrapper').renderGoods();
  new ProductsList().searchProduct();
  new ProductsList().makeGETRequest(productApi)
    .then((data) => {
      let productObject = JSON.parse(data);
      new ProductsList().fetchGoods(productObject);
      // console.log(productObject);
    })
    .catch((error) => {
      console.log(error);
    });


  /////////////////////////////// КОРЗИНА ////////////////////////////////////

  let btnBasket = document.querySelector('.basket-btn'); // Кнопка корзины
  let productBasket = document.querySelector('.header-basket'); // Блок корзины
  let btnMinus = document.querySelectorAll('.item-minus'); // Кнопка убавить количество товара
  let btnPlus = document.querySelectorAll('.item-plus'); // Кнопка прибавить количество товара
  let blockQuantity = document.querySelectorAll('.product-quant span'); // Блок с количеством товара
  let btnAddBasket = document.querySelectorAll('.product-add-basket'); // Кнопка "добавить товар в корзину"
  let blockProducts = document.querySelectorAll('.product-block'); // Блок товара
  let totalBlock = document.querySelector('.basket-total span'); // блок итоговой суммы
  

  class ChangeQuantity {
    constructor() {
      this.quantity = blockQuantity;
    }

    changeQuantityBlock(val, index) {
      switch(val) {
        case 'item-minus':
          if(this.quantity[index].innerText === '1') {
            return;
          }
          this.quantity[index].innerText--;
          break;
        case 'item-plus':
          this.quantity[index].innerText++;
          break;
      }
    }
  }

  // При клике на кнопку "минус", убавляет количество товара
  btnMinus.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      let target = e.target.classList.value;
      new ChangeQuantity().changeQuantityBlock(target, index);
    });
  });
  // При клике на кнопку "плюс", прибавляет количество товара
  btnPlus.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      let target = e.target.classList.value;
      new ChangeQuantity().changeQuantityBlock(target, index);
    });
  });

  // класс Basket принимает товар и добавляет его
  class Basket {
    constructor(container, good) {
      this.container = container;
      this.good = good;
      this.total = totalBlock;
      this.blockGood = document.querySelectorAll('.basket-product');
      this.removeGoodBtn = document.querySelectorAll('.basket-delete-product');
    }

    // Метод показывает корзину
    getBasket() {
      productBasket.classList.toggle('header-basket-active');
    }

    // Метод добавляет товар в корзину
    addItemСart() {
      document.querySelector(this.container).insertAdjacentHTML('beforeend', this.renderProduct());
      this.getTotalSum();
    }

    // Метод удаляет товар с корзины
    removeProduct() {
      this.removeGoodBtn.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
          this.blockGood[index].remove();
          this.getTotalSum();
        });
      });
    }

    // Метод получает блок с продуктом
    renderProduct() {
      return `<div class="basket-product">
                <div class="basket-image">
                  <img src="${this.good.img}" alt="${this.good.title}">
                </div>
                <p class="basket-product-title">${this.good.title}</p>
                <p class="basket-product-quantity">${this.good.quantity}</p>
                <p class="basket-product-price">${this.good.price}</p>
                <button class="basket-delete-product">Удалить</button>
              </div>`;
    }

    // Метод считает итоговую сумму
    getTotalSum() {
      let total = 0;
      let basketPdctPrice = document.querySelectorAll('.basket-product-price');
      let basketPdctQuant = document.querySelectorAll('.basket-product-quantity');
      for(let i = 0; i < basketPdctPrice.length; i++) {
        total += +basketPdctQuant[i].innerText * +basketPdctPrice[i].innerText;
      }
      return this.total.innerText = total;
    }
  }

 
  // При клике на кнопку корзины, показывает корзину
  btnBasket.addEventListener('click', new Basket().getBasket);

  // При клике на кнопку "добавить товар", обращаемся к классу Basket, который добавляет товар
  btnAddBasket.forEach((btn, index) => {
    btn.addEventListener('click', () => {

      let productObject = {
        title: blockProducts[index].querySelector('.product-block-title').innerText,
        price: blockProducts[index].querySelector('.product__price').innerText,
        img: 'http://placehold.it/200x200',
        quantity: blockQuantity[index].innerText,
      };
      new Basket('.header-basket-product', productObject).addItemСart();
      new Basket().removeProduct();
    });
  });


  ////////////////////// Гамбургер ////////////////////////
  let quantityPrice = document.querySelectorAll('.gamburger-price span'),
      allBlocksGamburger = document.querySelectorAll('.gamb-block'),
      blocksGamburgers = document.querySelectorAll('.gamburger-block'),
      blocksFillings = document.querySelectorAll('.filling-block'),
      blocksAdditional = document.querySelectorAll('.additional-block'),
      quantityCalory = document.querySelectorAll('.gamburger-calory span'),
      gamburgerBtns = document.querySelectorAll('.gamburger-btn'),
      fillingBtns = document.querySelectorAll('.filling-btn'),
      additionalBtns = document.querySelectorAll('.additional-btn'),
      totalPrice = document.querySelector('.total-gamburger span'),
      totalCalory = document.querySelector('.total-calory span');

  // Функция считает итоговую сумму и калории
  function getTotalSumAndCalory() {
    let totalSum = 0;
    let totalCal = 0;

    for(let i = 0; i < allBlocksGamburger.length; i++) {
      if(allBlocksGamburger[i].classList.contains('gamb-block-active')) {
        totalSum += +quantityPrice[i].innerText;
        totalCal += +quantityCalory[i].innerText;
      }
    }
  return totalPrice.innerText = totalSum,
          totalCalory.innerText = totalCal;
  }

  /**
   *  класс ActiveBlock принимает имя блока и делает его активным
   */
  class ActiveBlock {
    constructor(blockName, index) {
      this.blockName = blockName;
      this.index = index;
    }

    getActiveBlock() {
      if(this.blockName[this.index].classList.contains('gamb-block-active')) {
        this.blockName[this.index].classList.remove('gamb-block-active');
        getTotalSumAndCalory();
        return;
      }
      for(let i = 0; i < this.blockName.length; i++) {
        this.blockName[i].classList.remove('gamb-block-active');
      }
      this.blockName[this.index].classList.add('gamb-block-active');
      getTotalSumAndCalory();
    }
  }

  gamburgerBtns.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      let target = e.target.dataset.name;
      getBlockName(target, index);
    });
  });
  fillingBtns.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      let target = e.target.dataset.name;
      getBlockName(target, index);
    });
  });
  additionalBtns.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      let target = e.target.dataset.name;
      getBlockName(target, index);
    });
  });

// Функция проверяет имя блока и передает нужный блок в класс ACtiveBlock
  function getBlockName(target, index) {
    switch(target) {
      case 'gamburger-block':
        new ActiveBlock(blocksGamburgers, index).getActiveBlock();
        break;
      case 'filling-block':
        new ActiveBlock(blocksFillings, index).getActiveBlock();
        break;
      case 'additional-block':
        new ActiveBlock(blocksAdditional, index).getActiveBlock();
        break;
    }
  }

});