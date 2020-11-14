const { SocksProxyAgent } = require('socks-proxy-agent')

module.exports = () => {
    const proxyAgent = new SocksProxyAgent('socks5://127.0.0.1:9050')
    return proxyAgent
}