const sharp = require('sharp')

let originalImage = '/root/Projects/vlike666/img-opt.jpg'

module.exports = async (path) => {
    await sharp(path).extract({ width: 25, height: 34, left: 0, top: 0 }).toFile('/root/Projects/vlike666/cropped-image/1.png')
        .then(function (new_file_info) {
            // console.log("Image cropped and saved")
        })
        .catch(function (err) {
            console.log("An error occured",err)
        })
    await sharp(path).extract({ width: 25, height: 34, left: 25, top: 0 }).toFile('/root/Projects/vlike666/cropped-image/2.png')
        .then(function (new_file_info) {
            // console.log("Image cropped and saved")
        })
        .catch(function (err) {
            console.log("An error occured")
        })
    await sharp(path).extract({ width: 25, height: 34, left: 50, top: 0 }).toFile('/root/Projects/vlike666/cropped-image/3.png')
        .then(function (new_file_info) {
            // console.log("Image cropped and saved")
        })
        .catch(function (err) {
            console.log("An error occured")
        })
    await sharp(path).extract({ width: 25, height: 34, left: 75, top: 0 }).toFile('/root/Projects/vlike666/cropped-image/4.png')
        .then(function (new_file_info) {
            // console.log("Image cropped and saved")
        })
        .catch(function (err) {
            console.log("An error occured")
        })
}