<template>
  <div v-show="showFlag" class="food">
    <div class="product-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  computed: {
    showFlag() {}
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
        this.showFlag = false
    }
  }
};
</script>

<style lang="stylus" scoped>
.food
  position: fixed
  left: 0
  top: 0
  bottom: 48px
  z-index: 30
  width: 100%
  background: #ffffff
  .image-header
    position: relative
    width: 100%
    height: 0
    padding-top: 100%
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .back
      position: absolute
      top: 18px
      left: 0
      .icon-arrow_lift
        display: block
        padding: 10px
        font-size: 20px
        color: #ffffff
</style>