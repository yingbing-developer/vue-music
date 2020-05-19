<template>
    <music-list :title="title" :bgImages="bgImages" :songs="songs"></music-list>
</template>

<script type="text/ecmascrit-6">
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getDiscDetail} from 'api/recommend'
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
            return this.disc.dissname
        },
        bgImages() {
            return this.disc.imgurl
        },
        ...mapGetters([
            'disc'
        ])
    },
    created() {
        this._getDiscDetail()
    },
    components: {
        MusicList
    },
    methods: {
        _getDiscDetail() {
            if(!this.disc.dissid) {
                this.$router.back()
                return
            }
            getDiscDetail(this.disc.dissid).then((res) => {
                if(res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((musicData) => {
                if(musicData.id && musicData.album.id) {
                    if(creatSong(musicData)) {
                        ret.push(creatSong(musicData))
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
