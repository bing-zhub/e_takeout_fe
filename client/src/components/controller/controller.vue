<template>
  <div>
    <div class="controller">
      <div class="minus icon-remove_circle_outline" @click="removeFromCart($event)" v-show="food.count>0"/>
      <div class="count" v-show="food.count>0">{{food.count}}</div>
      <div class="add icon-add_circle" @click="addToCart($event)"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object
    }
  },
  created () {
    // console.log(this.food)
  },
  methods: {
    addToCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    removeFromCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .controller
    font-size: 0
    .minus, .add
      font-size: 24px
      display: inline-block
      padding: 6px
      color: rgb(0,160, 220)
    .count
      vertical-align: top
      width: 12px
      padding: 5px
      line-height: 24px
      font-size: 10px
      display: inline-block
      text-align: center
      color: rgb(147, 153, 159)
    .add
      display: inline-block
</style>
