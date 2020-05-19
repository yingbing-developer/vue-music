<template>
    <music-list :rank="true" :songs="songs" :title="title" :bgImages="bgImages"></music-list>
</template>

<script type="text/ecmascrit-6">
import {mapGetters} from 'vuex'
import {getTopListDetail} from 'api/rank'
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
      'topList'
    ]),
    title() {
      return this.topList.titleShare
    },
    bgImages() {
      return this.topList.mbHeadPicUrl
    }
  },
  created() {
    this._getTopListDetail()
  },
  methods: {
    _getTopListDetail() {
      if(!this.topList.topId){
        this.$router.back()
        return
      }
      getTopListDetail(this.topList.topId, this.topList.period).then((res)=> {
        if(res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.detail.data.songInfoList)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        if(item.id && item.album.id) {
          if(creatSong(item)) {
            ret.push(creatSong(item))
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
</style>