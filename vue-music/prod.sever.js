var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var app = express()//请求server
var apiRoutes = express.Router()
// 后端代理，绕过host及referer end

apiRoutes.get('/getDiscList', function (req, res){
    var url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg"
    axios.get(url, {
        headers: {
        referer: 'https://c.y.qq.com',
        host: 'c.y.qq.com',
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
}),
apiRoutes.get('/getDiscDetail', function (req, res){
    var url = "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg"
    axios.get(url, {
        headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com',
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
}),
apiRoutes.get('/getLyric', function (req, res){
    var url = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg"
    axios.get(url, {
        headers: {
        referer: 'https://c.y.qq.com',
        host: 'c.y.qq.com',
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
}),
apiRoutes.get('/getSearchResult', function (req, res){
    var url = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp"
    axios.get(url, {
        headers: {
        referer: 'https://c.y.qq.com',
        host: 'c.y.qq.com',
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
})

app.use('/api',apiRoutes)

app.use(express.static('./dist'))

var port = process.env.PORT || config.build.port
var hostname = process.env.HOST || '0.0.0.0'

module.exports = app.listen(port, hostname, function (err) {
    if(err) {
        console.log(err)
    }
    console.log(`Listening at http://${hostname}:${port}` + '\n')
})