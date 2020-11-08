const { createReadStream } = require("fs")
const { createGzip } = require("zlib")
const { request } = require("http")
const { basename } = require("path")

const filepath = process.argv[2]

const req = request({
    hostname: "localhost",
    port: 3000,
    path: "/",
    method: "PUT",
    headers: {
        "Content-Type": "application/octet-stream",
        "Content-Encoding": "gzip",
        "X-Filename": `${basename(filepath)}`,
    }
}, res => {
    console.log(`Got response with status: ${res.statusCode}`)
})

createReadStream(filepath)
    .pipe(createGzip())
    .pipe(req)
    .on("finish", () => console.log("File uploaded to the server"))
    .on("error", e => console.log(`An error occured: ${e.message}`))