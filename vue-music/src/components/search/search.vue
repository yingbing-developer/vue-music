<template>
<div class="search">
  <div class="search-box-wrapper">
    <search-box ref="searchBox" @query="queryChange"></search-box>
  </div>
  <div ref="shortcutWrapper" class="shortcut-wrapper">
    <scroll :refreshDelay="refreshDelay" class="shortcut" ref="shortcut" :data="shorcut">
      <div>
        <div class="hot-key" v-show="!query">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li @click="addQuery(item.title)" class="item" v-for="(item, index) in hotKey" :key="index">
              {{item.title}}
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <search-list @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
        </div>
      </div>
    </scroll>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest @select="saveSearch" @listScroll="blurInput" ref="suggest" :query="query"></suggest>
    </div>
  </div>
  <confirm ref="confirm" text="是否清空所有搜索历史？" confirmBtnText="清空" @confirm="clearSearchHistory"></confirm>
  <child-router-view></child-router-view>
</div>
</template>

<script type="text/ecmascrit-6">
import SearchBox from 'base/search-box/search-box'
import ChildRouterView from 'base/child-router-view/child-router-view'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import SearchList from 'base/search-list/search-list'
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'
import Suggest from 'components/suggest/suggest'
import {playlistMixin, searchMixin} from 'common/js/mixin'
import {mapActions} from 'vuex'
export default {
  mixins: [playlistMixin, searchMixin],
  data() {
    return {
      hotKey: []
    }
  },
  created() {
    this._getHotKey()
  },
  computed: {
    shorcut() {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if(res.code === ERR_OK) {
          this.hotKey = res.hotkey.data.vec_hotkey.slice(0, 20)
        }
      })
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    ...mapActions([
      'clearSearchHistory'
    ])
  },
  watch: {
    query(newQuery) {
      if(!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  components: {
    SearchBox,
    Suggest,
    Scroll,
    ChildRouterView,
    Confirm,
    SearchList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    position fixed
    top 124px
    width 100%
    bottom 0
    .search-box-wrapper
      margin: 20px 10px 0px 10px
    .shortcut-wrapper
      position: fixed
      top: 214px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        position relative
        .hot-key
          margin: 0 10px 20px 10px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            border 1px solid $color-theme-h
            font-size: $font-size-medium
            color: $color-text
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 214px
      bottom: 0
      background $color-background
</style>
