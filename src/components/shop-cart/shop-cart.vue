<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper" @click="toggle">
          <div class="logo" :class="{'high-light': totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'high-light': totalCount > 0}"></i>
          </div>
          <div v-show="totalCount > 0" class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'high-light': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需起送费￥{{sellerDetail.deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{'high-light': totalPrice > 0 && totalPrice >= sellerDetail.minPrice}">
          {{payDesc}} {{this.fold}}
        </div>
      </div>
    </div>
    <div class="shop-cart-list" v-show="this.totalCount > 0 && fold">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty">清空</span>
      </div>
      <div class="list-content" ref="foodsScroll">
        <ul>
          <li class="food" v-for="(food,index) in selectFoods" :key="index">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span class="text">￥{{food.price * food.count}}</span>
            </div>
            <div class="cart-control-wrapper">
              <cart-control :food="food" @count-change="handleCountChange"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import CartControl from '../cart-control/cart-control'
import BScroll from 'better-scroll'

export default {
  name: 'shop-cart',
  components: {CartControl},
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      fold: false,
      foodScroll: null
    }
  },
  computed: {
    ...mapGetters({
      'getSellerDetail': 'seller/getSellerDetail',
      'getSelectFoods': 'seller/getSelectFoods'
    }),
    sellerDetail () {
      return this.getSellerDetail
    },
    selectFoods () {
      return this.getSelectFoods
    },
    totalPrice () {
      let total = 0
      this.selectFoods.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach(food => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.sellerDetail.minPrice}起送`
      } else if (this.totalPrice > 0 && this.totalPrice < this.sellerDetail.minPrice) {
        return `还差￥${this.sellerDetail.minPrice - this.totalPrice}起送`
      } else {
        return `去结算`
      }
    }
  },
  methods: {
    ...mapMutations({
      'setSelectFoods': 'seller/setSelectFoods'
    }),
    toggle  () {
      if (this.totalCount === 0) {
        return
      }
      this.fold = !this.fold
    },
    handleCountChange (val, food) {
      if (!food.count) {
        food.count = 1
      } else {
        food.count += val
      }
      const newSelectFood = this.selectFoods.filter((item) => {
        return (item.name !== food.name && item.count > 0)
      })
      if (food.count > 0) {
        newSelectFood.unshift(food)
      }
      this.setSelectFoods(newSelectFood)
    }
  },
  watch: {
    totalCount (val) {
      if (val === 0) {
        this.fold = false
      }
      this.$nextTick(() => {
        this.foodScroll = new BScroll(this.$refs.foodsScroll, {
          click: true
        })
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .shop-cart
    position: fixed
    bottom: 0
    z-index: 50
    width: 100%
    height: 58px
    background-color: #141d27
    .content
      display: flex
      height: 100%
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          position: relative
          vertical-align: top
          top: -10px
          margin: 0 12px
          padding: 6px
          display: inline-block
          width: 56px
          height: 56px
          box-sizing: border-box
          background-color: #141d27
          border-radius: 50%
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: rgb(51,55,67)
            text-align: center
            &.high-light
              background-color: rgb(0,160,220)
            .icon-shopping_cart
              line-height:  44px
              font-size: 24px
              color: rgba(255,255,255,.4)
              &.high-light
                color: rgb(255,255,255)
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: rgb(255,255,255)
            background-color: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
        .price
          display: inline-block
          margin-top: 12px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,.1)
          line-height: 24px
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,.4)
          &.high-light
            color: rgb(255,255,255)
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 12px
          color: rgba(255,255,255,.4)
      .content-right
        flex: 0 1 105
        width: 105px
        .pay
          height: 100%
          line-height: 58px
          background-color: rgb(43,51,59)
          text-align: center
          font-size: 12px
          font-weight: 700
          color: rgba(255,255,255,.4)
          &.high-light
            background-color: rgb(0,180,60)
            color: rgb(255,255,255)
    .shop-cart-list
      position: absolute
      left: 0
      bottom: 58px
      z-index: -1
      width: 100%
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background-color: #f3f5f7
        border-bottom: 1px solid rgba(7,17,27,.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7,17,27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0,160,220)
      .list-content
        padding: 0 18px
        max-height: 217px
        background-color: rgb(255,255,255)
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7,17,27,.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7,17,27)
          .price
            position: absolute
            right: 120px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240,20,20)
          .cart-control-wrapper
            position: absolute
            right: 0
            bottom: 6px

</style>
