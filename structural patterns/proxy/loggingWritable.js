const {createWriteStream} = require("fs")

const createLoggingWritable = () => new Proxy(writable, {
    get(target, prop) {
        if (prop === "write") {
            return function(...args) {
                const [chunk] = args
                console.log(`writing chunk: \n${chunk}`)
                target.write(...args)
            }
        }
        return target[prop]
    }
})

const writable = createWriteStream("test.txt")
const proxiedWritable = createLoggingWritable(writable)

proxiedWritable.write("using proxied writable")
proxiedWritable.write("to log and write to the test.txt")
writable.write("using normal writable, so this doesn't")
writable.write("get logged")