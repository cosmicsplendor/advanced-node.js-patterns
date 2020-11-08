module.exports = len => {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomString = ''
    for (let i = 0; i < len; i++) {
        let randomPos = Math.floor(Math.random() * charSet.length)
        randomString += charSet.substring(randomPos,randomPos + 1)
    }
    return randomString
}