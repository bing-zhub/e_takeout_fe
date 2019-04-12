<template>
  <div id="app">
    <v-header></v-header>
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
    <router-view/>
  </div>
</template>

<script>
import header from '@/components/header/header.vue'
export default {
  components: {
    'v-header': header
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
