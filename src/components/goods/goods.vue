<template>
  <div class="goods">
    <div class="menu-wrapper">
        <ul>
            <li v-for="(item, index) in goods" :key="index" class="menu-item">
              <span class="text border-1px">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                {{item.name}}</span>
              </li>
        </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goods: []
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
      }
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" scoped>
@import url('../../common/stylus/common.styl')

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
            content: ' ';
  .foods-wrapper
    flex: 1

</style>
