
require = (fs => {
    loadModule = (filename, require, module) => {
        const wrappedSrc =
            `(function(module, exports, require) {
                ${fs.readFileSync(filename, "utf-8")}
            }(module, module.exports, require))`
        eval(wrappedSrc)
    }
    const resolve = filename => __dirname.concat(filename) // a very simple resolver
    const cache = {}
    return filename => {
        console.log(`Require invoked for filename: ${filename}`)
        const id = resolve(filename)
        if (cache[id]) {
            return cache[id].exports
        }
        const module = {
            exports: {}
        }
        loadModule(id, require, module)
        cache[id] = module
        return module.exports
    }
})(require("fs"))
const imports = require("/revealingModule.js")
console.table(imports)