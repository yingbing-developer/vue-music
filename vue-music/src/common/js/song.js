import {getPlayUrl, getLyric} from 'api/song'
import {ERR_OK} from 'api/config'

export default class Song {
    constructor ({id, mid, singer, name, album, duration, image}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
    }
    _getPlayUrl() {
        if(this.playUrl) {
            return Promise.resolve(this.playUrl)
        }
        return new Promise ((resolve, reject) => {
            getPlayUrl(this.mid).then((res) => {
                if(res.code === ERR_OK) {
                    if(!res.req_0.data.midurlinfo['0'].purl) {
                      this.playUrl = ''
                      reject('歌曲无法播放')
                    } else {
                        this.playUrl = res.req_0.data.sip[1] + res.req_0.data.midurlinfo['0'].purl
                    }
                    resolve(this.playUrl)
                }else{
                    reject('歌曲无法播放')
                }
            })
        })
    }
    _getLyric() {
        if(this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise ((resolve, reject) => {
            getLyric(this.id).then((res) => {
                if(res.retcode === ERR_OK) {
                    this.lyric = res.lyric
                    resolve(this.lyric)
                }else{
                    reject('no lyric')
                }
            })
        })
    }
}

export function creatSong(musicData) {
    if (musicData.pay.pay_play === 1) {
        return false
    }
    return new Song({
        id: musicData.id,
        mid: musicData.mid,
        singer: filterSinger(musicData.singer),
        name: musicData.name,
        album: musicData.album.name,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`
    })
}

export function creatSearchSong(musicData) {
    if (musicData.pay.payplay === 1) {
        return false
    }
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
    })
}


function filterSinger(singer) {
    let ret = []
    if(!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}