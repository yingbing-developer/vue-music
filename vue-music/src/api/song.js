import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getPlayUrl (songmid) {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    const data = Object.assign({
        '-': 'getplaysongvkey700897959535075'
    }, commonParams, {
        data: JSON.stringify({"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"7764863790","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"7764863790","songmid":[songmid],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}})
    })

    return jsonp(url, data, options)
}

export function getLyric (songid) {
    const url = '/api/getLyric'
    const data = Object.assign({}, commonParams, {
        '-': 'jsonp1',
        nobase64: 1,
        musicid: songid
    })

    return axios.get(url,{
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}