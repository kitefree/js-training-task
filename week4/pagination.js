export default{
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#" @click.prevent="previousPage(pages.current_page - 1)">Previous</a></li>
      <li class="page-item" v-for="i in pages.total_pages" :key="i" :class="{ active:pages.current_page === i }">
        <a class="page-link" href="#" @click.prevent="updatePage(i)">{{i}}</a>
      </li>      
      <li class="page-item"><a class="page-link" href="#" @click.prevent="nextPage(pages.current_page + 1)">Next</a></li>
    </ul>
  </nav>`,
  props:['pages'],
  methods:{
    updatePage(num){
          this.$emit('update',num);
    },
    nextPage(num){
        if(this.pages.total_pages >= num)
        {
            this.$emit('update',num);
        }        
    },
    previousPage(num){
        if(num>0)
        {
            this.$emit('update',num);
        }        
    }
  }
}