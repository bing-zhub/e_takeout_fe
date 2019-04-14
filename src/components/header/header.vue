<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img height="64" width="64" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support" >
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="buletin-wrapper">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'gurantee']
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    color: #fff
    background-color #000
    .content-wrapper
    // 上右下左
      padding: 24px 12px 18px 24px
      // 去除缝隙
      font-size: 0px
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        margin-left: 14px
        display: inline-block
        font-size: 14px
        .title
          margin: 2px 0 8px 0
          .brand
          // 占位 否则被挤压
            display: inline-block
            // 和顶部对齐
            vertical-align: top
            width: 30px
            height: 18px
            background-image: url('brand.png')
            background-size: 30px 18px
            background-repeat: none
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
        .description
          margin-bottom: 10px
          font-weight: 200
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            background-size: 12px 12px
            width: 12px
            height: 12px
            margin-right: 4px
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
            vertical-align: top
            line-height: 12px
            font-size: 11px
</style>
