const { platform } = require("os")
if (platform === "windows") {
    console.log("Press 'Ctrl + C' to terminate the stream")
} else {
    console.log("Press 'Ctrl + D' to terminate the stream")
}
process.stdin
    .on("readable", () => {
        console.log("New data availble")
        let chunk
        while ((chunk = process.stdin.read())) {
            console.log(`Bytes: ${chunk.length}`)
            console.log(`Content: ${chunk.toString()}`)
        }
    })
    .on("end", () => {
        console.log("End of readable stream")
        process.exit(0)
    })