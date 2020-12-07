const { resolve } = require("path")
module.exports = (db) => {
    return {
        readFile(path, options, callback) {
            if (typeof options === "function") {
                callback = options
                options = {}
            } else if (typeof options === "string") {
                options = { encoding: options }
            }
            db.get(resolve(path), { valueEncoding: options.encoding }, (error, val) => {
                if (error) {
                    if (error.type === "NotFoundError") {
                        error = new Error(`ENOENT, open "${path}"`)
                        error.code = "ENOENT"
                        error.errno = 34
                        error.path = path
                    }
                    return callback && callback(error)
                }
                callback && callback(null, val)
            })
        },
        writeFile(path, content, options, callback) {
            if (typeof options === "function") {
                callback = options
                options = {}
            } else if (typeof options === "string") {
                options = {
                    encoding: options
                }
            }
            db.put(resolve(path), content, {
                valueEncoding: options.encoding
            }, callback)
        }
    }
}