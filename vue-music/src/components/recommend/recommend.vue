<template>
  <div class="recommend" ref="recommend">
    <div class="refresh-container">
      <refresh ref="refresh"></refresh>
    </div>
    <scroll ref="scroll" 
            class="recommend-content" 
            :data="discList"
            :pulldown="pulldown"
            @pullingdownMove="pullingdownMove"
            @pullingdownRefresh="pullingdownRefresh"
    >
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a @click="selectSlider(item)">
                <img class="needsclick" @load="loadImage" :src="item.pic_info.url" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li @click="selectItem(item)" v-for="(item, index) in discList" :key="index" class="item">
                <div class="icon">
                  <img v-lazy="item.imgurl" width="60" height="60" alt="">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.dissname"></h2>
                  <p class="desc" v-html="item.creator.name"></p>
                </div>
              </li>
            </ul>
            <div class="loading-container" v-show="!discList.length">
              <loading></loading>
            </div>
        </div>
      </div>
    </scroll>
    <child-router-view></child-router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import Refresh from 'base/refresh/refresh'
import ChildRouterView from 'base/child-router-view/child-router-view'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'


export default {
  mixins: [playlistMixin],
  data () {
    return {
      recommends: [],
      discList: [],
      pulldown: true
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          const arr = res.focus.data.content
          arr.forEach((item, index) => {
            item.type === 10014 || item.type === 10002 ? this.recommends.push(item) : ''
          })
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    loadImage() {
      if(!this.checkLoaded){
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    pullingdownMove(posY) {
      if(posY < 70) {
        this.$refs.refresh.beforeRefresh()
      } else {
        this.$refs.refresh.refreshReady()
      }
    },
    pullingdownRefresh(posY) {
      if(posY < 70) {
        this.$refs.refresh.beforeRefresh()
      } else {
        this.$refs.scroll.disable()
        this.$refs.recommend.style['paddingTop'] = '70px'
        this.$refs.refresh.refreStart()
        this.$nextTick(() => {
          this._getDiscList()
        })
      }
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/disc:${item.dissid}`
      })
      this.setDisc(item)
    },
    selectSlider(item) {
      const url = item.jump_info.url
      if(url.indexOf('http://') > -1) {
        window.location.href = url
        return
      }
      const type = item.type
      const arr = {
        dissid: item.jump_info.url,
        dissname: '独家推荐',
        imgurl: item.pic_info.url
      }
      if(type === 10014) {
        this.$router.push({
          path: `/recommend/disc:${url}`
        })
        this.setDisc(arr)
      }else {
        this.$router.push({
          path: `/recommend/album:${url}`
        })
        this.setAlbum(arr)
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC',
      setAlbum: 'SET_ALBUM'
    })
  },
  watch: {
    discList () {
      if(this.discList) {
        this.$refs.refresh.refreshSuccess()
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.recommend.style['paddingTop'] = '0'
            this.$refs.scroll.refresh()
            this.$refs.scroll.enable()
            this.$refs.refresh.refreshEnd()
          }, 500)
        })
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading,
    ChildRouterView,
    Refresh
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    width: 100%
    position fixed
    top 124px
    bottom 0
    .recommend-content
      overflow: hidden
      height 100%
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        background $color-background
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 10px 10px 10px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-l
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
    .refresh-container
      width 100%
      position absolute
      top 0
</style>