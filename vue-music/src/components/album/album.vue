<template>
    <music-list :title="title" :bgImages="bgImages" :songs="songs"></music-list>
</template>

<script type="text/ecmascrit-6">
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getAlbumDetail} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {creatSong} from 'common/js/song'
export default {
    data() {
        return {
            songs: []
        }
    },
    computed: {
        title() {
            return this.album.dissname
        },
        bgImages() {
            return this.album.imgurl
        },
        ...mapGetters([
            'album'
        ])
    },
    created() {
        this._getAlbumDetail()
    },
    components: {
        MusicList
    },
    methods: {
        _getAlbumDetail() {
            if(!this.album.dissid) {
                this.$router.back()
                return
            }
            getAlbumDetail(this.album.dissid).then((res) => {
                if(res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.albumSonglist.data.songList)
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((musicData) => {
                if(musicData.songInfo.id && musicData.songInfo.album.id) {
                    if(creatSong(musicData.songInfo)) {
                        ret.push(creatSong(musicData.songInfo))
                    }
                }
            })
            return ret
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
