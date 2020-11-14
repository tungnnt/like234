const { createWorker } = require('tesseract.js')

const worker = createWorker()

module.exports = async (path) => {
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    await worker.setParameters({
        tessedit_char_whitelist: '0123456789',
    });
    const { data: { text } } = await worker.recognize(path)
    // console.log(text)
    return text.replace(/[\D]/gi,'')
    // await worker.terminate()
}