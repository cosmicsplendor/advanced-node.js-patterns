const cluster = require("cluster")
const { createServer } = require("http")
const { platform, cpus } = require("os")


if (cluster.isMaster) {
    const availableCpus = cpus()

    if (platform === "windows") {
        cluster.schedulingPolicy = cluster.SCHED_RR
    }
    availableCpus.forEach(() => cluster.fork())
    console.log(`Number of worker processes: ${Object.values(cluster.workers).length}`)
} else {
    const { pid } = process
    const server = createServer((req, res) => {
        console.log(`Handling request from ${pid}`)
        for (let i = 10e10; i > 0; i--) {
            if (Math.random < 0.00001) {
                console.log("Very unlikely event just happened")
            }
        }
        res.end(`Hello from ${pid}`)
    })
    server.listen(8080, () => console.log(`Server started at ${pid}`))
}