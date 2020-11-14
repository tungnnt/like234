const readCaptchaV2 = require('./service/read-captcha-v2')
const HttpProxyAgent = require('https-proxy-agent')
const register = require('./api/register')
const login = require('./api/login')
const orderTask = require('./api/order-task')
const getTaskList = require('./api/get-task-list')
const submitTask = require('./api/submit-task')
const {
    getNewProxy,
    checkCurrentProxy,
    getAPIKeyInfo,
    getCurrentIP,
} = require('./service/tinsoft-proxy')
const randomIpv4 = require('random-ipv4')
const fs = require('fs')

const _randomIPHeader = () => {
    const ip = randomIpv4()
    return {
        'X-Originating-IP': ip,
        'X-Forwarded-For': ip,
        'X-Remote-IP': ip,
        'X-Remote-Addr': ip,
    }
}

const _run = async () => {
    const ipHeader = _randomIPHeader()

    response = await readCaptchaV2()
    const { code: captcha } = response
    console.log({ captcha })

    response = await register(captcha, ipHeader)
    const { code: registerResponseCode, phone } = response
    if (registerResponseCode !== 200) throw new Error('Register fails.')
    fs.appendFile('./account.txt', phone + '\n', () => { })

    console.log(response)

    response = await login(phone)
    const { code: loginResponseCode, data: loginResponseData } = response
    if (loginResponseCode !== 200) throw new Error('Login fails.')
    const { token } = loginResponseData
    console.log({ token })

    response = await orderTask('2687', token)
    console.log(response)
    response = await orderTask('2686', token)
    console.log(response)
    response = await orderTask('2685', token)
    console.log(response)

    response = await getTaskList(token)
    const { data: getTaskListResponseData } = response
    const { data: taskList } = getTaskListResponseData
    const taskIDArray = taskList.map(task => {
        return { id: task.id, taskIdentifier: task.task_id }
    })
    console.log(taskIDArray)

    await Promise.all(taskIDArray.map(async task => {
        const { id, taskIdentifier } = task
        response = await submitTask(id, taskIdentifier, token)
        console.log(response)
    }))
}

setImmediate(async () => {
    while (true) {
        try {
            await _run()
        } catch (error) {
            console.log(`[ERROR] ${error.message}`)
        }
    }
})