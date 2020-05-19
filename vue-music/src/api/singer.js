import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList (area) {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    let jsonpPromise = []
    for (let i = 0; i < area.length; i++) {
        let data = Object.assign({
            '-': 'getUCGI' + Math.floor(Math.random() * Math.pow(10, 17))
        }, commonParams, {
            data: JSON.stringify({"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":area[i],"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}})
        })
        jsonpPromise[i] = jsonp(url, data, options)
    }
    return Promise.all([
        jsonpPromise[0],
        jsonpPromise[1],
        jsonpPromise[2],
        jsonpPromise[3],
        jsonpPromise[4]
    ])
}

export function getSingerDetail (singerId) {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    const data = Object.assign({
        '-': 'getSingerSong' + Math.floor(Math.random() * Math.pow(10, 17))
    }, commonParams, {
        data: JSON.stringify({"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":singerId,"begin":0,"num":100},"module":"musichall.song_list_server"}})
    })

    return jsonp(url, data, options)
}


// export function getSingerDetail (singerId, beginNum) {
//     const url = '/api/getSingerDetail'
//     // const data = Object.assign({}, {
//     //     "req_0": {
//     //         "module": "musichall.song_list_server",
//     //         "method": "GetSingerSongList",
//     //         "param": {
//     //             "singerMid": singerId,
//     //             "begin": beginNum,
//     //             "num": 15,
//     //             "order": 1
//     //         }
//     //     },
//     //     "comm": {
//     //         "g_tk": 5381,
//     //         "uin": 0,
//     //         "format": "json"
//     //     }
//     // })
//     let data =  new URLSearchParams()
//     data.append('{"req_0":{"module":"musichall.song_list_server","method":"GetSingerSongList","param":{"singerMid": "' + singerId + '","begin":' + beginNum + ',"num":15,"order":1}},"comm":{"g_tk":5381,"uin":0,"format":"json"}}','')
//     return axios.post(url, data, {
//         headers: { 'content-type-Type': 'application/x-www-form-urlencoded' }
//     }).then((res) => {
//         return Promise.resolve(res.data)
//     })
// }

// export function goVote() {
//     const url = '/api/goVote'
//     const data = Object.assign({}, {
//         id: 15990,
//         act: 'postsurvey',
//         surid: 15990,
//         'sur[32486][]': 127074,
//         ref: 'http://news.ifeng.com/survey.shtml?isappinstalled=0',
//         from: 'timeline',
//         callback: 'jQuery19100637014171218444_1577425127773',
//         _: 1577425127776
//     })
//     return axios.get(url, {
//         params: data
//     }).then((res) => {
//         return Promise.resolve(res.data)
//     })
// }