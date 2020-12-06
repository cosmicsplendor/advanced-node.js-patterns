const StackCalculator = require("../StackCalculator")

class EnhancedCalculator {
    constructor(calculator) {
        this.calculator = calculator
    }
    add() { // new method
        const result = this.getValue() + this.getValue()
        return result
    }
    divide() { // modified method
        const { calculator } = this
        if (calculator.peekValue() === 0) {
            throw new Error("Division By Zero")
        }
        return calculator.divide()
    }
    // delegated methods
    putValue(val) {
        return this.calculator.putValue(val)
    }
    getValue() {
        return this.calculator.getValue()
    }
    peekValue() {
        return this.calculator.peekValue()
    }
    multiply() {
        return this.calculator.multiply()
    }
}

const calculator = new StackCalculator()
const enhancedCalculator = new EnhancedCalculator(calculator)
enhancedCalculator.putValue(4)
enhancedCalculator.putValue(3)
console.log(enhancedCalculator.add())      // 4+3 = 7
enhancedCalculator.putValue(2)
console.log(enhancedCalculator.multiply()) // 7*2 = 14”