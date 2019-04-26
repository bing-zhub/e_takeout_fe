<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li v-for="(item, index) in goods" :key="index" class="menu-item" @click="selectMenu(index, $event)" :class="{'current': currentIndex===index}">
              <span class="text border-1px">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                {{item.name}}</span>
              </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food, index) in item.foods" class="food-item" @click="selectFood(food, $event)" :key="index">
              <div class="icon">
                <img :src="food.icon" width="57px" height="57px">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
              <div class="controller-wrapper">
                <controller :food="food"></controller>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <product :food="selectedFood" ref="food"></product>
    <shop-cart :selected-foods="selectedFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ShopCart from '@/components/cart/cart.vue'
import Controller from '@/components/controller/controller.vue'
import Product from '@/components/product/product.vue'


export default {
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.$http.get('/api/goods').then((response) => {
      if (response.ok) {
        this.goods = response.data
        // 确保DOM已经渲染完毕
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3
      })

      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
        // console.log(this.scrollY)
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let food = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let el = food[index]
      this.foodScroll.scrollToElement(el, 500)
      // console.log(index)
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      // console.log(this.selectedFood)
      this.$refs.food.show()
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let upLimit = this.listHeight[i]
        let downLimit = this.listHeight[i + 1]
        let inRange = this.scrollY >= upLimit && this.scrollY < downLimit
        if (!downLimit || inRange) {
          // console.log(downLimit+' ' + inRange + ' ' + i)
          return i
        }
      }
      return 0
    },
    selectedFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      // console.log(foods)
      return foods
    }
  },
  components: {
    ShopCart,
    Controller,
    Product
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

border-none()
  &.after
    display: none

.goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            background-image: url('decrease_1.png')
          &.discount
            background-image: url('discount_1.png')
          &.guarantee
            background-image: url('guarantee_1.png')
          &.invoice
            background-image: url('invoice_1.png')
          &.special
            background-image: url('special_1.png')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
          &:after
            display: block
            position: absolute
            left: 0
            bottom: 0
            width: 100%
            border-top: 1px solid rgba(7,17,27,0.1)
            content: ' '
        &.current
          position: relative
          z-index: 10
          margin-top: -border-1px
          background: #ffffff
          font-weight: 700
          .text
            border-none()
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      border-1px(rgba(7, 17, 27, 0.1))
      padding-bottom: 18px
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          margin-bottom: 8px
        .extra
          line-height: 10px
          .count
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
          right: 0
          top: 12px
</style>
