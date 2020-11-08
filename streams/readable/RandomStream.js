const { Readable } = require("stream")
const getRandomStr = require("../utils/getRandStr")

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