<template>
<div class="rank" ref="rank">
  <scroll class="toplist" :data="topList" ref="scroll">
    <div>
    <ul v-for="(group, index) in topList" :key="index">
      <li class="item" v-for="(list, index) in group.toplist" :key="index" @click="selectItem(list)" v-show="list.recType === 10005">
        <div class="icon">
          <img width="100" height="100" v-lazy="list.frontPicUrl"/>
        </div>
        <ul class="songlist">
          <li class="song" v-for="(song, index) in list.song" :key="index">
            <span>{{index + 1}}.</span>
            <span>{{song.title}}-{{song.singerName}}</span>
          </li>
        </ul>
      </li>
    </ul>
    </div>
    <div class="loading-container" v-show="!topList.length">
      <loading></loading>
    </div>
  </scroll>
  <child-router-view></child-router-view>
</div>
</template>

<script type="text/ecmascrit-6">
import MHeader from 'components/m-header/m-header'
import ChildRouterView from 'base/child-router-view/child-router-view'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playlistMixin} from 'common/js/mixin'
import {getTopList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {mapMutations} from 'vuex'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      topList: []
    }
  },
  components: {
    MHeader,
    ChildRouterView,
    Scroll,
    Loading
  },
  created() {
    setTimeout(() => {
      this._getTopList()
    }, 1000)
  },
  methods: {
    _getTopList() {
      getTopList().then((res) => {
        if(res.code === ERR_OK) {
          this.topList = res.topList.data.group
        }
      })
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.topId}`
      })
      this.setTopList(item)
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 124px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      ul
        &:last-child
          padding-bottom: 20px
      .item
        display: flex
        margin: 0 10px
        padding-top: 10px
        height: 100px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-ll
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
