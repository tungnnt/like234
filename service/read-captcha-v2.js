const Client = require('@infosimples/node_two_captcha');

const _getEpoch = () => {
    var myDate = new Date()
    var myEpoch = myDate.getTime()
    return myEpoch + _randomInt(5000)
}

const _randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const API_KEY = 'df9c80fd7b7ff94f9703c3b2049e084c'

module.exports = async () => {
    const randomNumber = Math.random()

    let client = new Client(API_KEY, {
        timeout: 60000,
        polling: 5000,
        throwErrors: false
    });

    const url = `https://www.like234.com/api/auth/captcha?a=${randomNumber}`

    return new Promise((resolve, reject) => {
        client.decode({
            url: url
        }).then(function (response) {
            resolve({ code: response.text, randomNumber })
        }).catch(error => {
            console.log("[ERROR SOLVE CAPTCHA]", error)
            reject(error.message)
        })

    })
}
