<template>
  <div v-show="showFlag" class="food" ref="productPage">
    <div class="product-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="controller-wrapper" v-show="food.count && food.count!==0">
          <controller :food="food"></controller>
        </div>
        <div class="add" v-show="!food.count || food.count ===0" @click="addToCart($event)">加入购入车</div>
        <div class="price">
          <span class="now">{{food.price}}元</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}元</span>
        </div>
      </div>
      <spacer v-show="food.info"/>
      <div class="info" v-show="food.info">
        <h1 class="title">商品介绍</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <spacer/>
      <div class="rating">
        <h1 class="title">评价</h1>
      </div>
      <rating :type="type" :with-text="withText" :desc="desc"/>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Controller from '@/components/controller/controller.vue'
import Vue from 'vue'
import Spacer from '@/components/spacer/spacer.vue'
import Rating from '@/components/rating/rating.vue'

const POS = 0
const NEG = 1
const ALL = 2

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
      showFlag: false,
      type: ALL,
      withText: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.type = ALL
      this.withText = true
      // console.log(1)
      this.$nextTick(() => {
        if (!this.scroll) {
          // console.log(2)
          this.scroll = new BScroll(this.$refs.productPage, {
            click: true
          })
        } else {
          // console.log(3)
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addToCart (event) {
      if (!event._constructed) {
        return
      }
      Vue.set(this.food, 'count', 1)
    }
  },
  components: {
    Controller,
    Spacer,
    Rating
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
        color: #fff
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
      display: inline-block
      float: right
    .add
      display: inline-block
      float: right
      line-height: 24px
      padding: 0 12px
      box-sizing: border-box
      border-radius: 12px
      font-size: 10px
      color: #ffffff
      background: rgb(0, 160, 220) 
  .info
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 6px
      font-size: 14px
      color: rgb(7, 17, 27)
    .text
      line-height: 24px
      padding: 0 8px
      font-size: 12px
      color: rgb(77, 85, 93)
  .rating
    padding-top: 18px
    .title
      line-height: 18px
      margin-left: 18px
      font-size: 14px
      color: rgb(7, 17, 27)
</style>
