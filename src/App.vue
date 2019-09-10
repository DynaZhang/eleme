<template>
  <div id="app">
    <v-header :seller-detail="sellerDetail"/>
    <div class="tabs border-1px">
      <div :class="{'tab-item': true, 'active': currentTab === 0}" @click="toPage('/goods',0)">商品</div>
      <div :class="{'tab-item': true, 'active': currentTab === 1}" @click="toPage('/ratings',1)">评论</div>
      <div :class="{'tab-item': true, 'active': currentTab === 2}" @click="toPage('/seller',2)">商家</div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import VHeader from '@/components/header/header'

import {getSeller} from '@/api/data'
export default {
  name: 'App',
  components: {
    VHeader
  },
  data () {
    return {
      currentTab: 0,
      sellerDetail: {}
    }
  },
  methods: {
    toPage (path, index) {
      this.currentTab = index
      this.$router.replace(path,
        () => {},
        () => {})
    }
  },
  created () {
    getSeller({}).then(res => {
      if (res.result) {
        this.sellerDetail = res.data
      } else {
        this.sellerDetail = {}
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="stylus">
  @import '../src/common/stylus/mixins.styl'
  #app
    .tabs
      display: flex
      flex-direction: row
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,.1))
      .tab-item
        flex: 1
        font-size: 14px
        text-align: center
        color: rgb(77,85,93)
        cursor: pointer
        &.active
          color: rgb(240,20,20)
</style>
