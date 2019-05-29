<template>
  <div id="app">
    <!-- 通过props实现父子组件通信 -->
    <div v-show="showHeader">
      <v-header :seller="seller"></v-header>
        <div class="tab">
          <div class="tab-item">
            <router-link to="/goods">商品</router-link>
          </div>
          <div class="tab-item">
            <router-link to="/ratings">评价</router-link>
          </div>
          <div class="tab-item">
            <router-link to="/sellers">卖家</router-link>
          </div>
        </div>
      </div>
    <router-view :seller="seller" :showHeader="showHeader" @HideHeader="hideHeader"/>
  </div>
</template>

<script>
import header from '@/components/header/header.vue'
import api from '@/api/api.js'
export default {
  data () {
    return {
      seller: {},
      showHeader: true,
      hash: window.location.hash,
      headerDisable: ['payment', 'order', 'check']
    }
  },
  components: {
    // header是h5标签 起别名
    'v-header': header
  },
  watch:{
    $route(to,from){
      this.headerDisable.forEach(val => {
        if(to.path.indexOf(val) > -1) {
          this.showHeader = false;
          return;
        }else{
          this.showHeader = true;
        }
      })
    }
  },
  created () {
    this.showHeader = true
    // 创建时 获取api
    this.$http.get(api.getSeller).then((response) => {
      if (response.status === 200) {
        this.seller = response.data
        this.$store.commit('updateSeller', this.seller)
      }
    })
  },
  methods: {
    hideHeader() {
      this.showHeader = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .tab
      display:flex
      width:100%
      height: 40px
      line-height: 40px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .tab-item
        flex: 1
        text-align: center
        & > a
        // &父标签
          display: block
          // 点周围也可切换
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color rgb(240, 20, 20)

</style>
