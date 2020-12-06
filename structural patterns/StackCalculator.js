module.exports = class StackCalculator {
    constructor() {
        this.stack = []
    }
    putValue(val) {
        this.stack.push(val)
        return this
    }
    getValue() {
        return this.stack.pop()
    }
    peekValue() {
        return this.stack[this.stack.length - 1]
    }
    multiply() {
        const result = this.getValue() * this.getValue()
        this.putValue(result)
        return result
    }
    divide() {
        const divisor = this.getValue()
        const dividend = this.getValue()
        const result = dividend / divisor
        return result
    }
}