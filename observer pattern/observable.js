const {EventEmitter} = require("events")
const {readFile} = require("fs")

class FindRegex extends EventEmitter {
    constructor(regex) {
        super()
        this.files = []
        this.regex = regex
    }
    addFile(file) {
        this.files.push(file)
        return this
    }
    exec() {
        const {files, regex} = this
        files.forEach(file => {
            readFile(file, "utf-8", (err, content) => {
                if (err) {
                    return this.emit("error", err)
                }
                this.emit("fileread", file, content)
                const matches = content.match(regex)
                if (!!matches) {
                    matches.forEach(match => this.emit("matched", match, file))
                }
            })
        })
        return this
    }
}
const findRegexInstance = new FindRegex(/(require|exports|imports)/g)
findRegexInstance
    .addFile("./module pattern/commonjs.js")
    .exec()
    .on("error", error => console.log(`error occured: ${error.message}`))
    .on("fileread", file => console.log(`${file} file successfully read`))
    .on("matched", match => console.log(`match found for "${match}"`))