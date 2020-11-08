const { createWriteStream } = require("fs")
const { createGunzip } = require("zlib")
const { createServer } = require("http")
const { basename } = require("path")
const { exec } = require("child_process")

exec("mkdir created_files")
const server = createServer((req, res) => {
    const filename = req.headers["x-filename"]
    const destination = `created_files/${basename(filename)}`
    req.pipe(createGunzip())
       .pipe(createWriteStream(destination))
       .on("finish", () => {
           res.writeHead(201, {
               "Content-Type": "text/plain"
           })
           res.end("OK\n")
       })
})

server.listen(3000, () => console.log("Listening to port 3000"))