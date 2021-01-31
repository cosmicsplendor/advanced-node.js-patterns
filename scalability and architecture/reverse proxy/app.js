const { createServer } = require("http")

const PORT = process.env.PORT || Number.parseInt(process.argv[2])

/**
 *  three instances of this node is expected to be run (by nginx.conf)
 * on 3 different ports: 8080, 8081 and 8083
 *  with the help of forever or another node superviser
 * forever start app.js <PORT>
 */

// nginx -c {PWD}/nginx.conf

const server = createServer((request, response) => {
    console.log("Incoming request")
    let i = 0; while (i < 1e7) { i++ }
    response.end(`Hello from port ${PORT}`)
})

server.listen(PORT, () => {
    console.log(`Server Listening on Port: ${PORT}`)
})