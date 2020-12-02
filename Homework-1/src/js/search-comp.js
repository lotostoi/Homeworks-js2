const SearchComp =  {
  template: `<div class="header-search">
                <form>
                    <input v-model="searchLine" class="input-search" type="text" value="" placeholder="Поиск">
                    <input @click.prevent="filter(searchLine)" class="submit-btn" type="submit" value="Go">
                </form>
            </div>
  `,
  data: () => ({
    searchLine: '',
  }),
  methods: {
    filter() {},
  },
}
