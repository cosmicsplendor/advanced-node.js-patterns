const profilerFactory = require("./profilerFactory")
const profiler = profilerFactory("Naive Fibonacci")

const calcFib = num => num < 2 ? num: calcFib(num - 1) + calcFib(num - 2) 

profiler.start()
console.log(calcFib(Number(process.argv[2])))
profiler.end()