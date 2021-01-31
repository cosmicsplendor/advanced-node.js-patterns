import { createServer } from "http"
import { hostname } from "os"

const version = 1

// docker build -tag <tag name> .
// docker run --it -p <host_port>:<container_port> <tag or hash>
const server = createServer((req, res) => {
    let i = 0; while (i < 1e7) { i++ }
    res.end(`${hostname()} (v${version})`)
})

server.listen(8080, () => console.log("Server listening on port 8080"))