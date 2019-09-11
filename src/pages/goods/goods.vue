<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current': currentIndex === index}" @click="handleSelectMenu(index,$event)">
          <span class="text">
            <Icon :type="item.type" :size="3"></Icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,i) in goods" :key="i" class="menu-item" style="color: #000">
          <h1 class="title">{{item.name}}</h1>
          <ul class="food-list">
            <li class="food-item" v-for="(food,j) in item.foods" :key="j">
              <div class="avatar">
                <img width="57" height="57" :src="food.icon" alt="no pic" />
              </div>
              <div class="content">
                <p class="name">{{food.name}}</p>
                <p class="desc">{{food.description}}</p>
                <p class="info">
                  <span class="sell-count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </p>
                <p class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old">￥12</span>
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart/>
  </div>
</template>

<script>
import Icon from '@/components/icon/icon'
import ShopCart from '@/components/shop-cart/shop-cart'

import BScroll from 'better-scroll'

import {getGoodsBySellerId} from '@/api/data'

export default {
  name: 'goods',
  components: {
    Icon,
    ShopCart
  },
  data () {
    return {
      goods: [],
      menuScroll: null,
      foodScroll: null,
      heightList: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex: {
      get () {
        for (let i = 0; i < this.heightList.length; i++) {
          let height1 = this.heightList[i]
          let height2 = this.heightList[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        if (this.scrollY > this.heightList[this.heightList.length - 1]) {
          return this.heightList.length - 1
        }
        return 0
      },
      set () {}
    }
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3
      })
      this.foodScroll.on('scroll', (pos) => {
        // pos.y为负值，取其绝对值
        console.log(this.scrollY)
        this.scrollY = Math.abs(pos.y)
      })
    },
    handleSelectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      const foodList = this.$refs.foodsWrapper.getElementsByClassName('title')
      const el = foodList[index]
      this.foodScroll.scrollToElement(el, 500)
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('title')
      for (let i = 0; i < foodList.length; i++) {
        const height = foodList[i].offsetTop
        this.heightList.push(height)
      }
    }
  },
  created () {
    getGoodsBySellerId({}).then(resp => {
      if (resp.result) {
        this.goods = resp.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      } else {
        this.goods = []
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table
        padding: 0 12px
        height: 54px
        width: 56px
        line-height: 14px
        color: rgb(0,0,0)
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          font-weight: 700
          background-color: rgb(255,255,255)
          .text
            border-none()
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
    .foods-wrapper
      flex: 1
      .menu-item
        .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          background-color: #f3f5f7
          color: rgb(147,153,159)
          border-left: 2px solid #d9dde1
        .food-list
          .food-item
            display: flex
            margin: 18px 18px 0 18px
            padding-bottom: 18px
            border-1px(rgba(7,17,27,.1))
            &:last-child
              border-none()
            .avatar
              flex: 0 0 77px
              width: 77px
              img
                border-radius: 2px
            .content
              flex: 1
              line-height: 10px
              font-size: 10px
              color: rgb(147,153,159)
              .name
                margin-top: 2px
                line-height: 14px
                font-size: 14px
                color: rgb(7,17,27)
              .desc
                margin-top: 8px
              .info
                margin-top: 8px
                .sell-count
                  margin-right: 12px
              .price
                margin-top: 8px
                line-height: 24px
                .now
                  margin-right: 8px
                  font-size: 14px
                  font-weight: 700
                  color: rgb(240,20,20)
</style>
