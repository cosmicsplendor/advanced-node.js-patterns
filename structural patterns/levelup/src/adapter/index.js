const { create } = require("domain");
const level = require("level")
const createFSAdapter = require("../../../adapter/createFSAdapter")

// ;(function() {
//     // using fs module
//     const fs = require("fs")
//     fs.writeFile('./src/db/file.txt', 'Hello!', () => {
//         fs.readFile('./src/db/file.txt', { encoding: 'utf8' }, (err, res) => {
//             if (err) {
//             return console.error(err)
//             }
//             console.log(res)
//         })
//     })

//     // trying to read a missing file
//     fs.readFile('./src/db/missing.txt', { encoding: 'utf8' }, (err, res) => {
//         console.error(err)
//     })
// })()

// using fs adapter for fs
const db = level("./src/db", {
    valueEncoding: "binary"
})
const fs = createFSAdapter(db)
fs.writeFile('./src/db/file.txt', 'Hello!', () => {
    fs.readFile('./src/db/file.txt', { encoding: 'utf8' }, (err, res) => {
        if (err) {
            return console.error(err)
        }
        console.log(res)
    })
})

// trying to read a missing file
fs.readFile('./src/db/missing.txt', { encoding: 'utf8' }, (err, res) => {
    // expecting an error
    console.error(err)
})

