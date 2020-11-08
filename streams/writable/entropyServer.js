const { createServer } = require("http")
const getRandomStr = require("../utils/getRandStr")
console.log(getRandomStr(Math.floor(Math.random() * 10)))

const server = createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    })
    while (Math.random() < 0.9) {
        res.write(getRandomStr(Math.floor(Math.random() * 10)))
    }
    res.end("\n\n")
})

server.listen(3000, () => console.log("listening on port 3000"))