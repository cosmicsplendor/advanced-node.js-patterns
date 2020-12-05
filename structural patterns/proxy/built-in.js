// using built-in es6 Proxy class
console = new Proxy(console, {
    get: (target, prop) => {
        if (prop === "log") {
            if (process.env.mode === "development") {
                return target[prop]
            }
            return () => {}
        }
        console.log(target)
        return target[prop]
    }
})