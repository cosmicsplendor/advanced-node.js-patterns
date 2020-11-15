const UrlBuilder = require("./UrlBuilder")

const redisUrl = new UrlBuilder()
  .setProtocol('http')
  .setAuthentication("username", "pwd")
  .setHostname("127.0.0.1")
  .setPort(6379)
  .build()
console.log(redisUrl.toString())