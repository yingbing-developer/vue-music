import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'

export function getTopList () {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    const data = Object.assign({}, {
        _: '15778506' + Math.floor(Math.random() * Math.pow(10, 5)),
        data: JSON.stringify({"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1,"ct":23,"cv":0},"topList":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}}})
    })

    return jsonp(url,data,options)
}

export function getTopListDetail (topId, period) {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    const data = Object.assign({
        '-': 'getUCGI' + Math.floor(Math.random() * Math.pow(10, 16)),
    }, commonParams, {
        data: JSON.stringify({"detail":{"module":"musicToplist.ToplistInfoServer","method":"GetDetail","param":{"topId":topId,"offset":0,"num":100,"period":period}},"comm":{"ct":24,"cv":0}})
    })

    return jsonp(url,data,options)
}