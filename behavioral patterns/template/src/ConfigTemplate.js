const { promises: fs, existsSync, mkdirSync } = require("fs")

const objectPath = require("object-path")  

if (!existsSync("./data")) {
    mkdirSync("./data")
}

module.exports = class Config {
    constructor() {
        this.data = {}
    }
    set(path, data) {
        objectPath.set(this.data, path, data)
    }
    get(path) {
        objectPath.get(this.data, path)
    }
    _serialize(text) {
        throw new Error("serialize method hasn't been implemented")
    }
    _deserialize(data) {
        throw new Error("deserialize method hasn't been implemented")
    }
    async load(filepath) {
        const text = await fs.readFile(filepath, "utf-8")
        this.data = this._deserialize(text)
        return this.data
    }
    async save(filepath) {
        const text = this._serialize(this.data)
        await fs.writeFile(filepath, text)
    }
}