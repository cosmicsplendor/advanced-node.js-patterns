console.log = (function() {
    const proxied = console.log
    return function(...args) {
        if (process.env.mode === "development") {
            return proxied(...args)
        }
    }
}())