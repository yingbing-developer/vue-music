<template>
<div class="singer" v-if="singers" ref="singer">
  <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <child-router-view></child-router-view>
    <div class="loading-container" v-show="!singers.length">
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/ecmascrit-6">
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import {getPinYin} from 'api/pinyin'
import ListView from 'base/listview/listview'
import ChildRouterView from 'base/child-router-view/child-router-view'
import {mapMutations} from 'vuex'
import Loading from 'base/loading/loading'
import {playlistMixin} from 'common/js/mixin'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  mixins: [playlistMixin],
  data() {
    return {
      singer: [],
      singer_key: [],
      singerList: [],
      singerReady: false,
      singers: []
    }
  },
  components: {
    ListView,
    ChildRouterView,
    Loading
  },
  watch: {
    singerReady() {
      setTimeout(() => {
        this._getPinYin(this.singer_key)
      },20)
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      const area = [-100, 200, 2, 5, 4]
      getSingerList(area).then((res) => {
        area.forEach((item, index) => {
          if (res[index].code === ERR_OK) {
              const singers = res[index].singerList.data.singerlist
              let str = JSON.stringify(this.singerList)
              singers.forEach((singerlist, index2) => {
                if(str.indexOf(singerlist.singer_name) === -1){
                  this.singerList.push(singerlist)
                  this.singer_key.push(singerlist.singer_name)
                }
              })
          }
        })
        this.singerReady = true
      })
    },
    _getPinYin(text) {
      let _this = this
      /* 将歌手姓名保留第一位字符，并以“,”衔接拼成字符串 */
      text.forEach ((item,index) => {
        item = item.replace(/(^\s*)|(\s*$)/g, "") // 去除每个数组字符串多余的空格
        item = item.slice(0, 1) + ',' // 每个数组字符串只保留首位
        _this.singer_key[index] = item
      })  
      let str = this.singer_key.join('') // 拼接成字符串
      getPinYin(str).then((res) => {
        if(parseInt(res.code) === 1) {
          /* 将接口返回的拼音字符串以逗号为分隔从新组成数组 */
          let pinyin = res.data.pinyin.replace(/\s+/g, "") // 去除字符串中多余的空格
          pinyin = pinyin.substring(0, pinyin.length - 1) // 去除字符串最后位逗号
          pinyin = pinyin.split(',') // 以逗号分隔组成数组

          /* 遍历数组对象，如果为英文，保留首字母并转化成大写字母后返值，否则返值“#” */
          let en = /[A-Za-z]/ // 英文正则
          pinyin.forEach((item, index) => {
            en.test(item) ? _this.singer_key[index] = (item.slice(0, 1)).toUpperCase() : _this.singer_key[index] = '#'
          })
          this.singers = this._normalizeSinger(this.singerList) // 拼音首字母转换完成后启用歌手拼接方法
        }
      })
    },
    _normalizeSinger(list) {
      let _this = this
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach ((item, index) => {
        if(index < HOT_SINGER_LEN) {
          map.hot.items.push({
            id: item.singer_mid,
            name: item.singer_name,
            avatar: item.singer_pic
          })
        }
        const key = _this.singer_key[index]
        if(!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          id: item.singer_mid,
          name: item.singer_name,
          avatar: item.singer_pic
        })
      })
      // 为了得到有序列表我们需要处理map
      let hot = []
      let ret = []
      let lat = []
      for(let key in map){
        let val = map[key]
        if(val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        }else if(val.title === HOT_NAME) {
          hot.push(val)
        }else if(val.title === '#') {
          lat.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret, lat)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
  position: fixed
  top: 123px
  bottom: 0
  width: 100%
.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
</style>
