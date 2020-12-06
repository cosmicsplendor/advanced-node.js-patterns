const StackCalculator = require("../StackCalculator")
const calculator = new StackCalculator()

const patchCalculator = calculator => {
    const proxiedDivide = calculator.divide
    calculator.divide = function() {
        if (this.peekValue() === 0) {
            throw new Error("Division By Zero")
        }
        return proxiedDivide.apply(this)
    }
}
patchCalculator(calculator)

try {
    calculator
        .putValue(100)
        .putValue(0)
        .divide()
} catch (e) {
    console.log(e.message)
}