const prompts = require('prompts')

const questions = [
    {
        type: 'text',
        name: 'code_rand',
        message: 'Timestamp ?'
    },
    {
        type: 'text',
        name: 'code',
        message: 'Code ?'
    }
]

module.exports = async () => {
    const response = await prompts(questions)

    return response
}