const { promises: fs, existsSync, mkdirSync } = require("fs")

const objectPath = require("object-path")  

if (!existsSync("./data")) {
    mkdirSync("./data")
}

module.exports = class Config {
    constructor(formatStrategy) {
        this.data = {}
        this.formatStrategy = formatStrategy
    }
    set(path, data) {
        objectPath.set(this.data, path, data)
    }
    get(path) {
        objectPath.get(this.data, path)
    }
    async load(filepath) {
        const content = await fs.readFile(filepath, "utf-8")
        this.data = this.formatStrategy.deserialize(content)
        return this.data
    }
    async save(filepath) {
        const serializedContent = this.formatStrategy.serialize(this.data)
        await fs.writeFile(filepath, serializedContent)
    }
}