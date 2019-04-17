<template>
    <div class="star" :class="starType">
        <span
            v-for="(itemClass, index) in itemClasses" 
            :class="itemClass"
            class="stat-item" 
            :key="index"></span>
    </div>
</template>
<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  props:{
      size: {
          type: Number
      },
      score: {
          type: Number
      }
  },
  computed: {
      statType () {
          return 'start-' + this.size;
      },
      itemClasses () {
          let res = [];
          let score = Math.floor(this.score*2)/2;
          let hasHalf = score%1 !== 0;
          let int = Math.floor(score);
          for(let i = 0; i < int; i++){
              res.push(CLS_ON);
          }
          if(hasHalf) res.push(CLS_HALF)
          for(let i = 0; i < LENGTH - int; i++){
              res.push(CLS_OFF)
          }
          return res;
      }
  }
};
</script>
<style lang="stylus">
    .star
        .star-item
            display: inline-block
            background-repeat: no-repeat 
        &.star-48
            .star-item
                width: 20px
                height: 20px
                margin-right: 22px
                background-size: 20px 20px
                &:last-child
                    margin-right: 0
                &.on
                    background-image: url('star48_on.png') 
                &.half
                    background-image: url('star48_half.png')
                &.off
                    background-image: url('star48_off.png')
        &.star-36
            .star-item
                width: 15px
                height: 15px
                margin-right: 6px
                background-size: 15px 15px
                &:last-child
                    margin-right: 0
                &.on
                    background-image: url('star36_on.png') 
                &.half
                    background-image: url('star36_half.png')
                &.off
                    background-image: url('star36_off.png')
        &.star-24
            .star-item
                width: 10px
                height: 10px
                margin-right: 3px
                background-size: 10px 10px
                &:last-child
                    margin-right: 0
                &.on
                    background-image: url('star24_on.png') 
                &.half
                    background-image: url('star24_half.png')
                &.off
                    background-image: url('star24_off.png')
</style>
