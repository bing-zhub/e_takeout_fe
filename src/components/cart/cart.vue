<template>
  <div>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <span class="icon-shopping_cart"></span>
                    </div>
                </div>
                <div class="price">0元</div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay">{{minPrice}}元起送</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
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
              .icon-shopping_cart
                font-size: 24px
                color: #80858a
                line-height: 44px
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
</style>
