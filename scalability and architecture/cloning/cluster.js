const cluster = require("cluster")
const { createServer } = require("http")
const { platform, cpus } = require("os")
const { once } = require("events")

// autocannon, a node based utility, can be used to stress test this app

if (cluster.isMaster) {
    const availableCpus = cpus()

    if (platform === "win32") {
        cluster.schedulingPolicy = cluster.SCHED_RR
    }

    availableCpus.forEach(() => cluster.fork())

    process.on("exit", (worker, code) => {
        if (code !== 0 && !worker.exitedAfterDisconnect ) {
            console.log(`Worker with pid ${worker.process.pid} crashed`)
            cluster.fork()
        }
    })

    process.on("USR2", async () => {
        for (const worker of cluster.workers) {
            worker.disconnect()
            await once(worker, "exit")
            if (!worker.exitedAfterDisconnect) {
                continue
            }
            const newWorker = cluster.fork()
            await once(newWorker, "listening")
        }
    })

    console.log(`Number of worker processes: ${availableCpus.length}`)
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