module.exports = db => {
    db.subscribe = function(pattern, listener) {
        db.on("put", (key, val) => {
            const matched = Object.keys(pattern).every(prop => {
                return pattern[prop] === val[prop]
            })
            if (matched) {
                listener(key, val)
            }
        })
    }
    return db
}