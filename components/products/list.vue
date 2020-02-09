<template>
  <div class="m-products-list">
    <dl>
      <dd v-for="item in nav" :key="item.name"
        :class="[item.name,item.active?'s-nav-active':'']"
        @click="navSelect">
        {{ item.txt }}
      </dd>
    </dl>
    <ul>
      <product v-for="(item, idx) in list"
        :key="idx"
        :meta="item"/>
    </ul>
  </div>
</template>

<script>
import Product from './product'
export default {
  components:{
    Product
  },
  props:{
    list:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          active: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
    }
  },
  methods:{
    navSelect:function (e) {
      let self = this
      for (let i=0; i<self.nav.length;i++) {
        self.nav[i].active=false
        if (self.nav[i].txt === e.target.innerText) {
          self.nav[i].active=true
        }
      }

    }
  }
}
</script>

<style scoped>

</style>
