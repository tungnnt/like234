const axios = require('axios')
const fs = require('fs')
const Tesseract = require('tesseract.js')
const sharp = require('sharp')
var Jimp = require("jimp");
const ocr = require('./ocr')
const cropImage = require('./crop-image')
const { uuid } = require('uuidv4');
const ora = require('ora');

const _parseToText = async (image, options = {}) => {

    // try {
    //     const { lang } = options
    //     const { data: { text } } = await Tesseract.recognize(image, lang || 'eng')

    //     console.log({ text })
    //     return text.replace(/[\D]/gi,'')
    // } catch (e) {
    //     console.log('[ERROR] _parseToText', options)
    //     return ''
    // }
    const text = await ocr(image)
    return text
}

const _downloadImage = async (epoch) => {
    const url = `http://www.vilike666.com/api/Account/code?code_rand=${epoch}`

    const path = './code.jpg'
    const writer = fs.createWriteStream(path)

    const response = await axios({
        url,
        method: 'get',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

const _getEpoch = () => {
    var myDate = new Date()
    var myEpoch = myDate.getTime()
    return myEpoch
}

const _processImage = async () => {
    const imageTest = './code.jpg'

    await Jimp.read(imageTest).then(function (image) {
        image
            .color([
                { apply: 'desaturate', params: [90] },
                { apply: 'lighten', params: [7] }
            ])
            .contrast(1)
            .write("/root/Projects/vlike666/img-opt.png")
    })

}

module.exports = async () => {
    const spinner = ora('Recognizing captcha...').start();

    const imageTest = './code.jpg'
    const imageFileName = uuid()

    const epoch = _getEpoch()
    await _downloadImage(epoch)

    await Jimp.read(imageTest).then(async function (image) {
        await image
            .color([
                { apply: 'desaturate', params: [90] },
                { apply: 'lighten', params: [7] }
            ])
            .contrast(1)
            .write(`/root/Projects/vlike666/${imageFileName}.png`)
    })

    await new Promise(resolve => setTimeout(resolve, 3000))

    await cropImage(`/root/Projects/vlike666/${imageFileName}.png`)

    const digit1 = await ocr('/root/Projects/vlike666/cropped-image/1.png')
    const digit2 = await ocr('/root/Projects/vlike666/cropped-image/2.png')
    const digit3 = await ocr('/root/Projects/vlike666/cropped-image/3.png')
    const digit4 = await ocr('/root/Projects/vlike666/cropped-image/4.png')

    fs.unlinkSync(`/root/Projects/vlike666/${imageFileName}.png`)

    spinner.stop()

    return {
        code: `${digit1}${digit2}${digit3}${digit4}`,
        epoch: epoch,
    }
}


// setImmediate(async () => {
//     console.log(await test())
// })