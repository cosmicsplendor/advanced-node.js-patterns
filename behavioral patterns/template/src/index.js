const ini = require("ini")

const ConfigTemplate = require("./ConfigTemplate")

const dataPath = "./data/antigravity.ini"

class IniConfig extends ConfigTemplate {
    _serialize(data) {
        return ini.stringify(data)
    }
    _deserialize(text) {
        return ini.parse(text)
    }
}

const iniConfig = new IniConfig()

iniConfig.set("url", {
    scheme: "https",
    host: "antigravity.sh",
    port: "443",
    path: "/api/initiate"
})
iniConfig.save(dataPath).then(() => {
    iniConfig.load(dataPath).then( () => {
        console.log(iniConfig.data)
        iniConfig.set("storage.provider.name", "aws-s3")
        iniConfig.set("storage.provider.url.host", "defextropia.s3.aws.com")
        console.log(iniConfig.data)
        iniConfig.save("./data/antigravity.ini")
    })
})