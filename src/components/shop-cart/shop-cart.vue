<template>
  <div class="shop-cart" v-if="sellerDetail">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price">￥0</div>
        <div class="desc">另需起送费￥{{sellerDetail.deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay">
          ￥{{sellerDetail.minPrice}}起送
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'shop-cart',
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
    return {}
  },
  computed: {
    ...mapGetters({
      'getSellerDetail': 'seller/getSellerDetail'
    }),
    sellerDetail () {
      return this.getSellerDetail
    }
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
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
          vertical-align: top
          background-color: #141d27
          border-radius: 50%
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: rgb(51,55,67)
            text-align: center
            .icon-shopping_cart
              line-height:  44px
              font-size: 24px
              color: rgba(255,255,255,.4)
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
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 12px
          color: rgba(255,255,255,.4)
      .content-right
        flex: 0 0 105
        width: 105px
        .pay
          height: 100%
          line-height: 58px
          background-color: rgb(43,51,59)
          text-align: center
          font-size: 12px
          font-weight: 700
          color: rgba(255,255,255,.4)
</style>
