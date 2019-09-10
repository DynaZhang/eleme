<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" style="color: #000">
          <span class="text">
            <span v-show="item.type > 0" class="icon"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
import {getGoodsBySellerId} from '../../api/data'

export default {
  name: 'goods',
  data () {
    return {
      goods: [],
      supportType: [
        'decrease',
        'discount',
        'guarantee',
        'invoice',
        'special'
      ]
    }
  },
  methods: {},
  created () {
    getGoodsBySellerId({}).then(resp => {
      if (resp.result) {
        this.goods = resp.data
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
    .foods-wrapper
      flex: 1
</style>
