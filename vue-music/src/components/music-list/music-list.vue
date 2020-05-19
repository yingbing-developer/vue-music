<template>
    <div class="music-list">
      <div class="header" ref="header">
        <div class="back">
          <i class="icon-back" @click="$router.back()"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
      </div>
      <div class="bg" ref="bg">
        <div class="play-wrapper"  @click="random" v-show="songs.length > 0">
          <div class="play">
            <i class="icon-play">
              随机播放全部
            </i>
          </div>
        </div>
        <div class="bg-image" :style="bgStyle" ref="bgImage"></div>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <scroll @scroll="scroll" 
              :probeType="probeType" 
              :listenScroll="listenScroll" 
              :data="songs" 
              class="list" 
              ref="list"
      >
          <div class="song-list-wrapper">
              <song-list :rank="rank" @select="selectItem" :songs="songs"></song-list>
          </div>
          <div class="loading-container" v-show="!songs.length">
            <loading></loading>
          </div>
      </scroll>
    </div>
</template>

<script type="text/ecmascrit-6">
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import {prefixStyle} from 'common/js/dom'
import Loading from 'base/loading/loading'
import {mapActions} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const filter = prefixStyle('filter')

export default {
  mixins: [playlistMixin],
  props: {
    bgImages: {
        type: String,
        default: ''
    },
    songs: {
        type: Array,
        default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        scrollY: 0
    }
  },
  computed: {
    bgStyle() {
        return `background-image: url(${this.bgImages})`
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
     this.imageHeight = this.$refs.bgImage.clientHeight
     this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
     this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
  },
  methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      scroll(pos) {
          this.scrollY = pos.y
      },
      selectItem(item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      random() {
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
  },
  watch: {
      scrollY(newY) {
          let translateY = Math.max(this.minTranslateY, newY)
          let scale = 1
          let blur = 0
          let bgOpacity = 0.4
          let zIndex = 0
          this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`
          const percent = Math.abs(newY / this.imageHeight)
          if(newY > 0) {
            scale = 1 + percent
            zIndex = 10
          }else{
            blur = Math.min(20 * percent, 20)
            bgOpacity = Math.min(Math.max(percent / 0.9, 0.4), 1)
          }
          this.$refs.bgImage.style[filter] = `blur(${blur}px)`
          if(newY < this.minTranslateY) {
            bgOpacity = 1
          }
          this.$refs.header.style['background'] = `rgba(212, 60, 51, ${bgOpacity})`
          this.$refs.bg.style['zIndex'] = zIndex
          this.$refs.bg.style[transform] = `scale(${scale})`
      }
  },
  components: {
      Scroll,
      SongList,
      Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .header
      position absolute
      top 0
      left 0
      right 0
      z-index 50
      background rgba(212, 60, 51, 0.4)
    .back
      display inline-block
      position relative
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme-w
    .title
      position: absolute
      top: 0
      left: 10%
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-theme-w
    .bg
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      .bg-image
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        background-size: cover
        background-position-x center
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-small
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 20px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>