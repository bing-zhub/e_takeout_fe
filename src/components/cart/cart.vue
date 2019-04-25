<template>
  <div>
    <div class="shopcart">
        <div class="content">
            <div class="content-left" @click="toggleList()">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'active':totalCount>0}">
                      <i class="icon-shopping_cart" :class="{'active':totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'active':totalPrice>0}">{{totalPrice}}元</div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="{'check': payStatus==='去支付'}">{{payStatus}}</div>
            </div>
            <div class="cart-list" v-show="listShow">
              <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty()">清空</span>
              </div>
              <div class="list-content" ref="listContent">
                <ul>
                  <li class="food" v-for="(item, index) in selectedFoods" :key="index">
                    <span class="name">{{item.name}}</span>
                    <div class="price">
                      <span>{{item.price * item.count}}</span>
                    </div>
                    <div class="controller-wrapper">
                      <controller :food="item"></controller>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
        </div>
    </div>
    <div class="mask" v-show="listShow"></div>
  </div>
</template>

<script>
import Controller from '@/components/controller/controller.vue'
import BScroll from 'better-scroll'

export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectedFoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectedFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let lCount = 0
      this.selectedFoods.forEach((food) => {
        lCount += food.count
      })
      return lCount
    },
    payStatus () {
      if (this.totalPrice === 0) {
        return this.minPrice + '元起送'
      }
      if (this.totalPrice < this.minPrice) {
        let msg = '还需' + (this.minPrice - this.totalPrice) + '元起送'
        return msg
      }
      if (this.totalPrice >= this.minPrice) {
        return '去支付'
      }
    },
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  components: {
    Controller
  },
  fold: true,
  methods: {
    toggleList () {
      // console.log(this.totalCount)
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
      // console.log("fold"+this.fold+" show:"+this.listShow)
    },
    empty () {
      this.selectedFoods.forEach((food) => {
        food.count = 0
      })
    }
  },
  data () {
    return {
      fold: true
    }
  }
}
</script>

<style lang="stylus" scoped>
border-1px($color)
  position: relative;
  &:after
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid $color;
    content: ' ';

.shopcart
  position: fixed
  left: 0
  bottom: 0
  z-index : 50
  width: 100%
  height: 48px
  .content
    display: flex
    background: #141d27
    font-size: 0
    .content-left
      flex: 1
      .logo-wrapper
        display: inline-block
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing: border-box
        vertical-align: top
        border-radius: 50%
        background: #141d27
        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          background: #2b343c
          text-align: center
          &.active
            background: rgb(0, 160, 220)
          .icon-shopping_cart
            font-size: 24px
            color: #80858a
            line-height: 44px
            &.active
              color: #ffffff
        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 18px
          line-height: 18px
          text-align: center
          border-radius: 16px
          font-size: 12px
          font-weight: 700
          color: #ffffff
          background: rgb(240,20,20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display: inline-block
        vertical-align: top
        line-height: 24px
        margin-top: 12px
        padding-right: 12px
        box-sizing: border-box
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        font-size: 16px
        font-weight: 700
        color: rgba(255,255,255,0.4)
        &.active
          color: #ffffff
      .desc
        display: inline-block
        vertical-align: top
        line-height: 24px
        margin: 12px 0 0 12px
        color: rgba(255,255,255,0.4)
        font-size: 10px
    .content-right
      flex: 0 0 105px
      width: 105px
      .pay
        background: #2b333b
        height: 48px
        font-size: 12px
        line-height: 48px
        text-align: center
        color: rgba(255,255,255,0.4)
        font-weight: 700
        &.check
          background: #00b43c
          color: #fff
  .cart-list
    position: absolute
    left: 0
    top: 0
    z-index: -1
    width: 100%
    transform: translate3d(0, -100%, 0)
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)
    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: hidden
      background: #fff
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7, 17, 27)
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
        .controller-wrapper
          position: absolute
          right: 0
          bottom: 6px
.mask
  position: fixed
  top: 0
  left: 0
  z-index: 40
  width: 100%
  height: 100%
  backdrop-filter: blur(10px)
  background: rgba(7, 17, 27, 0.6)
</style>
