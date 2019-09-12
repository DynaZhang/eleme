<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="sellerDetail.avatar" alt="no pic">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{sellerDetail.name}}</span>
        </div>
        <div class="desc">
          {{sellerDetail.description}}/{{sellerDetail.deliveryTime}}分钟送达
        </div>
        <div v-if="sellerDetail.supports" class="support">
          <Icon :type="sellerDetail.supports[0].type" :size="1" />
          <span class="text">{{sellerDetail.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="sellerDetail.supports" class="support-count" @click="handleDetailOpen">
        <span class="count">{{sellerDetail.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{sellerDetail.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="sellerDetail.avatar" alt="no pic" width="100%" height="100%"/>
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{sellerDetail.name}}</h1>
            <div class="star-wrapper">
              <Star :size="48" :score="sellerDetail.score" />
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="sellerDetail.supports" class="supports">
              <li class="support-item" v-for="(item,index) in sellerDetail.supports" :key="index">
                <Icon :type="item.type" :size="2" />
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="text">{{sellerDetail.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="handleDetailClose">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from '@/components/star/star.vue'
import Icon from '../icon/icon'

import {mapGetters} from 'vuex'

export default {
  name: 'v-header',
  components: {
    Icon,
    Star
  },
  data () {
    return {
      detailShow: false
    }
  },
  computed: {
    ...mapGetters({
      'getSellerDetail': 'seller/getSellerDetail'
    }),
    sellerDetail () {
      return this.getSellerDetail
    }
  },
  methods: {
    handleDetailOpen () {
      this.detailShow = true
    },
    handleDetailClose () {
      this.detailShow = false
    }
  },
  watch: {
    sellerDetail (val) {

    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixins.styl'
  .header
    position: relative
    color: #fff
    background-color: rgba(7,17,27,.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        padding: 2px
        font-size: 12px
        .title
          margin-bottom: 8px
          .brand
            display: inline-block
            vertical-align: middle
            width: 30px
            height: 18px
            bg-image("brand")
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            vertical-align: middle
            margin-left: 6px
            line-height: 18px
            font-size: 16px
            font-weight: bold
            color: rgb(255,255,255)
        .desc
          margin-bottom: 10px
          line-height: 12px
        .support
          .text
            vertical-align: top
            line-height: 12px
      .support-count
        position: absolute
        right: 12px
        bottom: 18px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background-color: rgba(0,0,0,.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7,17,27,.2)
      .bulletin-title
        display: inline-block
        vertical-align: middle
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        margin: 0 4px
        line-height: 28px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 8px
        margin-top: 2px
        font-size: 10px
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background-color: rgba(7,17,27,.8)
      fliter: blur(10px)
      &.fade-enter-active,&.fade-leave-active
        transition: all .5s ease
      &.fade-enter, &.fade-leave-active
        opacity: 0
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            font-size: 16px
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255,255,255,.2)
            .text
              padding: 0 12px
              font-size: 12px
              font-weight: 700
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .text
                line-height: 12px
                font-size: 12px
                font-weight: 200
          .bulletin
            margin: 0 auto
            width: 80%
            .text
              line-height: 24px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>
