<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="decreaseCount($event)">
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCount($event)"></div>
  </div>
</template>

<script>
export default {
  name: 'cart-control',
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  computed: {
    selectFoods () {
      return this.getSelectFoods
    }
  },
  methods: {
    addCount (event) {
      if (!event._constructed) {
        return
      }
      this.$emit('count-change', 1, this.food)
    },
    decreaseCount (event) {
      if (!event._constructed) {
        return
      }
      this.$emit('count-change', -1, this.food)
    }
  }
}
</script>

<style scoped lang="stylus">
  .cart-control
    font-size: 0
    .move-enter-active,.move-leave-active
      transition: all .5s linear
    .move-enter,.move-leave-active
      opacity: 0
      transform: translate3d(24px,0,0)
    .move-enter,.move-leave-active
      transform: rotate(180deg)
    .cart-decrease,.cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      font-weight: 700
      color: rgb(0,160,220)
    .cart-count
      display: inline-block
      vertical-align: top
      padding: 6px
      width: 24px
      line-height: 24px
      font-size: 10px
      color: rgb(147,153,159)
      text-align: center
</style>
