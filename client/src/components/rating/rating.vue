<template>
  <div class="rating">
      <div class="type border-1px">
          <span class="block positive" :class="{'active': selectType===2}">{{desc.all}}<span class="count">47</span></span>
          <span class="block positive" :class="{'active': selectType===0}">{{desc.positive}}<span class="count">47</span></span>
          <span class="block negative" :class="{'active': selectType===1}">{{desc.negative}}<span class="count">47</span></span>
      </div>
      <div class="switch" :class="{'active':withText}">
          <span class="icon-check_circle"></span>
          <span class="only-text">只看内容和评价</span>
      </div>
  </div>
</template>

<script>
const POS = 0
const NEG = 1
const ALL = 2

export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    withText: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
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

  .rating
    .type
      padding: 18px
      margin: 0 18px
      border-1px(rgb(7, 17, 27, 0.1))
      font-size: 0
      .block
        border-radius: 2px
        margin-right: 8px
        color: #fff
        font-size: 12px
        display: inline-block
        padding: 8px 12px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          font-size: 8px
          margin-left: 2px
          line-height: 16px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      &.active
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        font-size: 24px
        margin-right: 7px
      &.only-text
        font-size: 12px
</style>
