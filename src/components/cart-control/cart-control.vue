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
import {mapGetters, mapMutations} from 'vuex'
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
    ...mapGetters({
      'getSelectFoods': 'seller/getSelectFoods'
    }),
    selectFoods () {
      return this.getSelectFoods
    }
  },
  methods: {
    ...mapMutations({
      'setSelectFoods': 'seller/setSelectFoods'
    }),
    addCount (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count += 1
      }
      const newSelectFood = this.selectFoods.filter((item) => {
        return (item.name !== this.food.name && item.count > 0)
      })
      if (this.food.count > 0) {
        newSelectFood.unshift(this.food)
      }
      this.setSelectFoods(newSelectFood)
    },
    decreaseCount (event) {
      if (!event._constructed) {
        return
      }
      this.food.count -= 1
      const newSelectFood = this.selectFoods.filter((item) => {
        return (item.name !== this.food.name && item.count > 0)
      })
      if (this.food.count > 0) {
        newSelectFood.unshift(this.food)
      }
      this.setSelectFoods(newSelectFood)
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
