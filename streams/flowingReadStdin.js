process.stdin
    .on("data", chunk => {
        console.log("New data available")
        console.log(`Bytes: ${chunk.length}`)
        console.log(`Content: ${chunk.toString()}`)
    })
    .on("end", () => {
        console.log("End of readable stream")
        process.exit(0)
    })