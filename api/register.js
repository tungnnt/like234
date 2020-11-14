const axios = require('axios')
const RandExp = require('randexp')
const REF_CODE = '207595'

const _randomPhone = () => {
    return new RandExp(/^09[0-9]{8}$/).gen()
}

const _randomString = (length) => {
    var result = ''
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

const _randomCookie = () => `PHPSESSID=${_randomString(10)}l1c${_randomString(5)}nmse${_randomString(4)}`

module.exports = async (captcha, ipHeader, refCode = REF_CODE) => {
    const phone = _randomPhone()

    const data = `username=${phone}&password=Pa55w0rds&re_password=Pa55w0rds&code=${refCode}&dest=+660&lang=vi&captcha=${captcha}`

    const config = {
        method: 'post',
        url: 'https://www.like234.com/api/auth/register',
        headers: {
            'authority': 'www.like234.com',
            'accept': '*/*',
            'x-requested-with': 'XMLHttpRequest',
            'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'origin': 'https://www.like234.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': `https://www.like234.com/H5/register.html?code=${refCode}`,
            'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
            'cookie': _randomCookie(),
            ...ipHeader,
        },
        data: data,
    }
    
    console.log(config.headers)

    const response = await axios(config)
    return { ...response.data, phone }
}