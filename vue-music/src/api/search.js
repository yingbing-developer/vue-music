import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'

export function getHotKey () {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    const data = Object.assign({}, {
        cgiKey: 'GetHomePage',
        _: '15778576' + Math.floor(Math.random() * Math.pow(10, 5)),
        data: JSON.stringify({"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"MusicHallHomePage":{"module":"music.musicHall.MusicHallPlatform","method":"MobileWebHome","param":{"ShelfId":[101,102,161]}},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}})
    })

    return jsonp(url,data,options)
}

export function getSearchResult (query, page, zhida, perpage) {
    const url = '/api/getSearchResult'
    const data = Object.assign({
        _: '15778592' + Math.floor(Math.random() * Math.pow(10, 5)),
    }, commonParams, {
        w: query,
        zhidaqu: 1,
        catZhida: zhida ? 1  : 0,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: perpage,
        n: perpage,
        p: page,
        remoteplace: 'txt.mqq.all'
    })

    return axios.get(url,{
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}