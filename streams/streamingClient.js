const { createReadStream } = require("fs")
const { createGzip } = require("zlib")
const { request } = require("http")

const req = request({
    hostname: "localhost",
    port: 3000,
    path: "/",
    method: "PUT",
    headers: {
        "Content-Type": "application/octet-stream",
        "Content-Encoding": "gzip",
        "X-Filename": "image.jpg",
    }
}, res => {
    console.log(`Got response with status: ${res.statusCode}`)
})

createReadStream("image.jpg")
    .pipe(createGzip())
    .pipe(req)
    .on("finish", () => console.log("File uploaded to the server"))
    .on("error", () => console.log("An error occured"))