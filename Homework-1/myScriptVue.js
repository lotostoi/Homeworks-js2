const productApi = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const products= [
  {id: 1, title: 'Телевизор Samsung', price: 2000, img: 'http://placehold.it/350x300', quantity: 1},
  {id: 2, title: 'Iphone 12', price: 4000, img: 'http://placehold.it/350x300', quantity: 1},
  {id: 3, title: 'Sony Playstation', price: 3000, img: 'http://placehold.it/350x300', quantity: 1},
  {id: 4, title: 'MacBook Pro', price: 5200, img: 'http://placehold.it/350x300', quantity: 1},
];

// Приложение на Vue
const app = new Vue({
  el: '#myApp',
  data: {
    headerLinks: ['Каталог', 'Акции', 'О нас', 'Контакты'],
    catalogs: 'catalogData.json',
    imgProduct: 'http://placehold.it/350x300',
    imgCartProduct: 'http://placehold.it/50x50',
    goods: [],
    filteredGoods: [],
    cartItems: [],
    searchLine: '',
    basketIsActive: false,
  },

  methods: {
    // Метод делает запрос на сервер, для получения товаров
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        });
    },
    // Метод убавляет количество товара, если количество равно 1
    // то возвращает return
    addQuantity(quantity, index) {
      if(quantity > 1) {
        this.goods[index].quantity--;
      }
    },
    // Метод добавляет товар в корзину
    addProductCart(product) {
      let findElem = this.cartItems.find(elem => elem.id_product === product.id_product);
      if(findElem) {
        findElem.quantity++;
      } else {
        let cartGood = {...product};
        this.cartItems.push(cartGood);
      }
    },
    // Метод удаляет товар из корзины
    remove(product) {
      if(product.quantity > 1) {
        product.quantity--;
      } else {
        this.cartItems.splice(product);
      }
    },
    // Метод фильтрует товар, когда пользователь ищет необходимый товар
    filter(value) {
      let regexp = new RegExp(value, 'gi');
      this.filteredGoods = this.goods.filter(name => regexp.test(name.product_name));
    },
    
  },

  computed: {
    // Метод считает общую сумму товаров в корзине
    getTotalSum() {
      return this.cartItems.reduce((val, elem) => {
        return val + elem.quantity * elem.price;
      }, 0);
    },
  },

  mounted() {
    this.getJson(`${productApi + this.catalogs}`)
        .then(data => {
          for(let el of data) {
            let prod = Object.assign({quantity: 1}, el);
            this.goods.push(prod);
          }
          this.filteredGoods = this.goods;
        });
  },
});