const { Readable } = require("stream")
const getRandomStr = (len) => {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomString = ''
    for (let i = 0; i < len; i++) {
        let randomPos = Math.floor(Math.random() * charSet.length)
        randomString += charSet.substring(randomPos,randomPos + 1)
    }
    return randomString
}

class RandomStream extends Readable {
    constructor(options) {
        super(options)
        this.emittedBytes = 0
    }
    _read(size) {
        const chunk = getRandomStr(size)
        if (Math.random() < 0.2) {
            return this.push(null)
        }
        this.push(chunk, "utf-8")
        this.emittedBytes += chunk.length
    }
}

module.exports = RandomStream