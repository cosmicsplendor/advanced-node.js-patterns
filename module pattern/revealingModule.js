const imports = (() => {
    /**
     * masking the variables declared inside the module from global scope
     * thanks to the closure of immediately invoked function expression (IEFE)
     */
    const privateFunc = () => {}
    const privateObj = {}
    const exports = {
        publicFunc: () => {},
        publicObj: {}
    }
    // making the export immutable
    return Object.freeze(exports)
})()
console.log(imports)