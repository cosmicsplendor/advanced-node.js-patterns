const { Transform } = require("stream")

class ReplaceStream extends Transform {
    constructor(searchStr, replaceStr, options) {
        super({ ...options })
        this.searchStr = searchStr
        this.replaceStr = replaceStr
        this.tail = ""
    }
    _transform(chunk, encoding, cb) {
        const { replaceStr, searchStr } = this
        const pieces = (this.tail + chunk).split(searchStr)
        this.tail = pieces[pieces.length - 1].slice(-searchStr.length + 1)
        pieces[pieces.length - 1] = pieces[pieces.length - 1].slice(0, -searchStr.length + 1)
        this.push(pieces.join(replaceStr))
        cb()
    }
    _flush(cb) {
        this.push(this.tail)
        cb()
    }
}
const replaceStream = new ReplaceStream("nodejs", "world")
replaceStream.on("data", chunk => console.log(chunk.toString()))
replaceStream.write("Hello nod")
replaceStream.write("ejs")
replaceStream.write("!")
replaceStream.end()


