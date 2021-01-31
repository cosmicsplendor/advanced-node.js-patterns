import { createServer } from "http"
import { hostname } from "os"

const version = 1

const server = createServer((req, res) => {
    let i = 0; while (i < 1e7) { i++ }
    res.end(`${hostname()} (v${version})`)
})

server.listen(8080, () => console.log("Server listening on port 8080"))