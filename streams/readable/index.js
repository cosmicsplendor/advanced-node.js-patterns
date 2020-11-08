const RandomStream = require("./RandomStream")

const randomStream = new RandomStream({
    encoding: null,
    objectMode: false,
    highWaterMark: 16384 // 16 KB
})

randomStream
    .on("data", chunk => {
        console.log(`Chunk Bytes: ${chunk.length}`)
        console.log(`Chunk Content: ${chunk}`)
    })
    .on("end", () => console.log(`Terminating the stream with ${randomStream.emittedBytes} Bytes of data`))