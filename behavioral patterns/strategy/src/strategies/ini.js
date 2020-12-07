const ini = require("ini")
module.exports = {
    deserialize: str => ini.parse(str),
    serialize: str => ini.stringify(str)
}