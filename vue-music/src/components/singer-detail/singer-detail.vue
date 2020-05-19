<template>
    <div class="singer-detail">
      <music-list :songs="songs" :title="title" :bgImages="bgImages"></music-list>
    </div>
</template>

<script type="text/ecmascrit-6">
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {creatSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title() {
      return this.singer.name
    },
    bgImages() {
      return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.id}.jpg?max_age=2592000`
    }
  },
  created() {
    // console.log(this.singer)
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if(!this.singer.id){
        this.$router.back()
        return
      }
      getSingerDetail(this.singer.id).then((res)=> {
        if(res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.singerSongList.data.songList)
          // console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        if(item.songInfo.id && item.songInfo.album.id) {
          if(creatSong(item.songInfo)) {
            ret.push(creatSong(item.songInfo))
          }
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background
</style>