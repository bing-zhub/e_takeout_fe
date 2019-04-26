<template>
  <div v-show="showFlag" class="food" ref="product">
    <div class="product-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
          <div class="price">
            <span class="now">{{food.price}}元</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}元</span>
          </div>
        </div>
        <div class="controller-wrapper" v-show="food.count && food.count!==0">
          <controller :food="food"></controller>
        </div>
        <div class="add" v-show="!food.count || food.count ===0" @click="addToCart()">加入购入车</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Controller from '@/components/controller/controller.vue'
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object
    }
  },
  computed: {
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.product, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    hide () {
      this.showFlag = false
    },
    addToCart () {
      Vue.set(this.food, 'count', 1)
    }
  },
  components: {
      Controller
  }
}
</script>

<style lang="stylus" scoped>
.food
  position: fixed
  left: 0
  top: 0
  bottom: 48px
  z-index: 30
  width: 100%
  background: #ffffff
  .image-header
    position: relative
    width: 100%
    height: 0
    padding-top: 100%
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .back
      position: absolute
      top: 18px
      left: 0
      .icon-arrow_lift
        display: block
        padding: 10px
        font-size: 20px
        color: #151c25
  .content
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 8px
      font-size: 14px
      font-weight: 700
      color: rgb(7,17,27)
    .detail
      margin-bottom: 18px
      line-height: 10px
      font-size: 0
      .sell-count, .rating
        font-size: 10px
        color: rgb(147, 153, 159)
      .sell-count
        margin-right: 12px
    .price
      font-weight: 700
      line-height: 24px
      .now
        margin-right: 8px
        font-size: 14px
        color: rgb(240, 20, 20)
      .old
        text-decoration: line-through
        font-size: 10px
        color: rgb(147, 153, 159)
  .controller-wrapper
    position: absolute
    right: 18px
    bottom: -60px
  .add
    position: absolute
    right: 18px
    bottom: -60px
    z-index: 10
    height: 24px
    line-height: 24px
    padding: 0 12px
    box-sizing: border-box
    border-radius: 12px
    font-size: 10px
    color: #ffffff
    background: rgb(0, 160, 220)  
</style>
