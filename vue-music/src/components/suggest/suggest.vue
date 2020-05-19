<template>
  <scroll :data="result"
          ref="suggest" 
          class="suggest"
          :pullup="pullup"
          @scrollToEnd="searchMore"
          :beforeScroll="beforeScroll"
          @beforeScroll="listScroll"
          >
    <ul class="suggest-list">
      <li class="suggest-item" @click="selectItem(item)" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title="正在加载"></loading>
      <div v-show="!hasMore && !result.length" class="no-result-wrapper">
        <no-result title="抱歉、暂无搜索结果"></no-result>
      </div>
    </ul>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import {getSearchResult} from 'api/search'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {ERR_OK} from 'api/config'
  import {creatSearchSong} from 'common/js/song'
  import {mapMutations, mapActions} from 'vuex'
  import Singer from 'common/js/singer'
  import NoResult from 'base/no-result/no-result'

  const TYPE_SINGER = 'singer'
  const perpage = 20

  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        hasMore: true,
        page: 1,
        result: [],
        pullup: true,
        beforeScroll: true
      }
    },
    methods: {
      search() {
        if(!this.query) {
          return
        }
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        getSearchResult(this.query,this.page, this.showSinger, perpage).then((res) => {
          if(res.code === ERR_OK) { 
            this.result = this._genResult(res.data)
            this._checkMore(res.data)
          }
        })
      },
      searchMore() {
        if(!this.hasMore) {
          return
        }
        this.page++
        getSearchResult(this.query,this.page, this.showSinger, perpage).then((res) => {
          if(res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      _checkMore(data) {
        const song = data.song
        if(!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false
        }
      },
      getIconCls(item) {
        if(item.type === TYPE_SINGER) {
          return 'icon-mine'
        }else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if(item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      _genResult(data) {
        let ret = []
        if(data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if(data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if(musicData.songid && musicData.albumid) {
            if(creatSearchSong(musicData)) {
              ret.push(creatSearchSong(musicData))
            }
          }
        })
        return ret
      },
      listScroll() {
        this.$emit('listScroll')
      },
      selectItem(item) {
        if(item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${item.singermid}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        this.$emit('select')
      },
      refresh() {
        this.$refs.suggest.refresh()
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query(newQuery) {
        this.search(newQuery)
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 20px
      .nothing
        text-align center;
        font-size: $font-size-medium
        color: $color-text-d
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()

</style>