module.exports = {
    deserialize: str => JSON.parse(str),
    serialize: data => JSON.stringify(data)
}