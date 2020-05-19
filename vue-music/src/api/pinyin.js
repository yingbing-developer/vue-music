import axios from 'axios'

export function getPinYin (text) {
    const url = 'https://www.toolnb.com/Tools/Api/hanzitopinyin.html'
    var data = new FormData()
    data.append('text',text)
    return axios.post(url, data
    ).then((res) => {
        return Promise.resolve(res.data)
    })
}