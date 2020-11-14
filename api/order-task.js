const axios = require('axios')

module.exports = async (id, token) => {
    const data = `id=${id}&lang=vi`

    const config = {
        method: 'post',
        url: 'https://www.like234.com/api/task/orderTask',
        headers: {
            'Host': 'www.like234.com',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'token': token,
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': 'https://www.like234.com',
            'Connection': 'close',
            'Referer': `https://www.like234.com/H5/index_taskListInfo.html?id=${id}`
        },
        data: data
    }

    const response = await axios(config)
    return { ...response.data, taskIdentifier: id }
}