const { createServer } = require("http")
const getRandomStr = require("../utils/getRandStr")

const startStreaming = res => {
    while (Math.random() < 0.9) {
        const chunk = getRandomStr(
            (1024 * 16) - 1
        )
        const bufferFull = !res.write(`${chunk}\n`)

        if (bufferFull) {
            return res.once("drain", () => startStreaming(res))
        }
    }

    res.end("\n\n")
}

const server = createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    })
   
    startStreaming(res)
})

server.listen(3000, () => console.log("listening on port 3000"))