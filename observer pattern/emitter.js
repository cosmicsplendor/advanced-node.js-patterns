const {EventEmitter} = require("events")
const {readFile} = require("fs")

function findRegex(files, regex) {
    const emitter = new EventEmitter()
    files.forEach(file => {
        readFile(file, "utf-8", (err, content) => {
            if (err) {
                return emitter.emit("error", err)
            }
            emitter.emit("fileread", file, content)
            const matches = content.match(regex)
            if (!!matches) {
                matches.forEach(match => emitter.emit("matched", match, file))
            }
        })
    })
    return emitter
}
findRegex(["./module pattern/commonjs.js"], /(require|exports|imports)/g)
    .on("error", error => console.log(`error occured: ${error.message}`))
    .on("fileread", file => console.log(`${file} file successfully read`))
    .on("matched", match => console.log(`match found for "${match}"`))
