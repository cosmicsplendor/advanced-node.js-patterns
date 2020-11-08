const { Writable } = require("stream")
const { promises: { writeFile }, existsSync, mkdirSync } = require("fs")
const { basename } = require("path")

const tfs = new Writable({ // toFileStream
    objectMode: true,
    write (chunk, encoding, cb) {
        const { path, content } = chunk
        const dirname = path.replace(basename(path), "")
        if (!existsSync(dirname)) {
            mkdirSync(dirname)
        }
        writeFile(path, content)
            .then(() => cb())
            .catch(cb)
    }
})
tfs.write({path: "files/file1.txt", content: "having fun"})
tfs.write({path: "files/file2.txt", content: "expirementing with"})
tfs.write({path: "files/file3.txt", content: "node.js streams"})
tfs.end(() => {
    console.log("All files created!")
})