<template>
  <div class="star" :class="starType">
    <span
      v-for="(itemClass,index) in itemClasses"
      :key="index"
      :class="itemClass"
      class="star-item">
    </span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  name: 'star',
  props: {
    size: {
      type: Number,
      default: 0
    },
    score: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  computed: {
    starType () {
      return `star-${this.size}`
    },
    itemClasses () {
      const result = []
      // 0.5
      const score = Math.floor(this.score * 2) / 2
      // 判断是否有小数点
      const hasDecimal = score % 1 !== 0
      // 向下取整
      const integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      for (let i = 0; i < LENGTH - integer; i++) {
        result.push(CLS_OFF)
      }
      return result
    }
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .star
    margin: 0 auto
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-24
      .star-item
        margin-right: 11px
        width: 12px
        height: 12px
        background-size: 12px 12px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
    &.star-36
      .star-item
        margin-right: 17px
        width: 15px
        height: 14px
        background-size: 15px 14px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-48
      .star-item
        margin-right: 22px
        width: 20px
        height: 20px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
</style>
