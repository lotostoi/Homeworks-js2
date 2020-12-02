// Приложение на Vue
const app = new Vue({
  el: '#myApp',
  data: {
  },

  components: {
    CompHeader,
    CompFooter,
    CompProducts,
  },

  methods: {
    // Метод делает запрос на сервер, для получения товаров
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error)
        })
    },
  },

})
