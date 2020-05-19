import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'

export function getRecommend () {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    const data = Object.assign({
        '-': 'recom' + Math.floor(Math.random() * Math.pow(10, 17))
    },commonParams,{
        data: JSON.stringify({"comm":{"ct":24},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}})
    })

    return jsonp(url,data,options)
}

export function getAlbumDetail (albumid) {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    const data = Object.assign({
        '-': 'albumSonglist' + Math.floor(Math.random() * Math.pow(10, 16))
    }, commonParams, {
        data: JSON.stringify({"comm":{"ct":24,"cv":10000},"albumSonglist":{"method":"GetAlbumSongList","param":{"albumMid":albumid,"albumID":0,"begin":0,"num":10,"order":2},"module":"music.musichallAlbum.AlbumSongList"}})
    })
    return jsonp(url,data,options)
}

export function getDiscList () {
    const url = '/api/getDiscList'
    const data = Object.assign({},commonParams,{
        picmid: 1,
        rnd: Math.random(),
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 19
    })

    return axios.get(url,{
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getDiscDetail (dissid) {
    const url = '/api/getDiscDetail'
    const data = Object.assign({}, commonParams, {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        new_format: 1,
        disstid: dissid
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}