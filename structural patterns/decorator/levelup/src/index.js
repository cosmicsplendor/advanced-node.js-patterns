const level = require("level")
const levelSubscribe = require("./levelSubscribe")

const db = level(__dirname, "db", { valueEncoding: "json" })
levelSubscribe(db)
db.subscribe({
    docType: "tweet",
    lang: "en"
}, (key, val) => {
    console.log(`New db entry matched the pattern: `)
    console.log(val)
})
db.put("first-tweet", {
    docType: "tweet",
    text: "My first tweet!",
    lang: "en"
})
db.put("first-issue", {
    docType: "issue",
    text: "this won't matched the subscribed pattern"
})