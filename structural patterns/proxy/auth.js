XMLHttpRequest.send = (function() { // send proxy adds bearer jwt to the request
    const proxied = send
    return function(...args) {
        this.prototype.setRequestHeader("Authorization", `Bearer ${localstorage.getItem("jwt")}`)
        proxied.call(this, ...args)
    }
}())