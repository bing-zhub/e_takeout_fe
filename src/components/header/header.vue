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
      <div v-if="seller.supports" class="support-count" @click="detailShow = true">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"/>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="detailShow = true">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail">
      <!-- 清除浮动 -->
      <div class="detail-wrapper">
        <div class="detail-main">
          <star :size="48" :score="4.2"></star>
          <h1 class="name">{{seller.name}}
          </h1>
        </div>
      </div>
      <div class="detail-close" @click="detailShow = false">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star.vue';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'gurantee']
  },
  components:{
    star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.3)
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
      .support-count
        position: absolute
        right: 12px
        top: 65px
        padding: 0 8px
        height: 24px
        line-height: 24px
        background: rgba(0,0,0,0.2)
        border-radius: 14px
        text-align: center
        vertical-align: bottom
        .count
          margin-left: 2px
          font-size: 12px
          vertical-align: top
        .icon-keyboard_arrow_right
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7,17,27,0.2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        height: 12px
        width: 22px
        background-image: url('./bulletin.png')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 2px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 12px
        right: 12px
        top: 8px
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7,17,27,0.8)
      .detail-wrapper
        min-height: 100%
        width: 100%
        display inline-block
        &:after
          display: block
          content: '.'
          height: 0
          line-height: 0
          clear: both
          visibility: hidden
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px

</style>
