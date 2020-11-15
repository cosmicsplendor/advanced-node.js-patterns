const { PassThrough } = require("stream")
const getRandStr = require("../utils/getRandStr")

const monitor = new PassThrough()

totalBytes = 0
monitor.on("data", chunk => {
    totalBytes += chunk.toString().length
})
monitor.on("finish", () => {
    console.log(`Bytes read: ${totalBytes}`)
})
while (Math.random() > 0.1) {
    monitor.write(getRandStr(10))
}
monitor.end()