const StackCalculator = require("../StackCalculator")
const calculator = new StackCalculator()

const safeCalculator = {
    stack: [],
    putValue: calculator.putValue,
    getValue: calculator.getValue,
    peekValue: calculator.peekValue,
    multiply: calculator.multiply,
    divide: function() {
        if (this.peekValue() === 0) {
            throw new Error("Division By Zero")
        }
        return this.divide()
    }
}

const calcResult = calculator
    .putValue(100)
    .putValue(0)
    .divide()
console.log({ calcResult })
try {
    safeCalculator
        .putValue(100)
        .putValue(0)
        .divide()
} catch (e) {
    console.log(e.message)
}