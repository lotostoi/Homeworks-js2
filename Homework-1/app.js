window.addEventListener('load', () => {

//  ES6

  const goods1 = [
    {title: 'Телевизор Samsung', price: 42000, img: 'http://placehold.it/350x300'},
    {title: 'Iphone 12', price: 64000, img: 'http://placehold.it/350x300'},
    {title: 'Sony Playstation', price: 33000, img: 'http://placehold.it/350x300'},
    {title: 'MacBook Pro', price: 252000, img: 'http://placehold.it/350x300'},
  ];

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
                      ${this.price} <span>&#8381;</span>
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

  class ProductsList {
    constructor(blockProducts, allGoods) {
      this.blockProducts = blockProducts;
      this.allGoods = allGoods;

      // this.receiveGoods();
    }

    receiveGoods() {
      this.allGoods.map((good) => {
        let productObject = new Product(good);
        document.querySelector(this.blockProducts).insertAdjacentHTML('beforeend', productObject.render());
      });
    }
  }

  let gds = new ProductsList('.product-wrapper', goods1);
  gds.receiveGoods();

  // ES5
  const goods2 = [
    {title: 'Телевизор LG', price: 38000, img: 'http://placehold.it/350x300'},
    {title: 'Iphone 12 PRO', price: 84000, img: 'http://placehold.it/350x300'},
    {title: 'X-BOX', price: 27000, img: 'http://placehold.it/350x300'},
    {title: 'Imac', price: 152000, img: 'http://placehold.it/350x300'},
  ];

  function getProduct(title, price, img) {
    return `<div class="product-block">
              <div class="product-block-img">
                <img src="${img}" alt="${title}">
              </div>
              <div class="product-block-content">
                <h2 class="product-block-title">
                  ${title}
                </h2>
                <p class="product-block-desc">
                  Этот товар получен с помощью ES5
                </p>
                <div class="product-block-quantity">
                  <p class="product__price">
                    ${price} <span>&#8381;</span>
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

  function renderProducts(prdct) {
    prdct.map((el) => {
      document.querySelector('.product-wrapper').insertAdjacentHTML('beforeend', getProduct(el.title, el.price, el.img));
    });
  }

  renderProducts(goods2);
});