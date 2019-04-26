<template>
  <div class="rating">
      <div class="type">
          <span>{{desc.all}}</span>
          <span>{{desc.positive}}</span>
          <span>{{desc.negative}}</span>
      </div>
      <div class="swirch">
          <span class="icon-check_circle"></span>
          <span class="onlyText">只看内容和评价</span>
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

<style lang="stylus" scoped></style>
