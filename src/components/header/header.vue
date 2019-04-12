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
          <span class="icon"></span>
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
</style>
