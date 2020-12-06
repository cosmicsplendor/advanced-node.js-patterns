const StackCalculator = require("../StackCalculator")

const decorateCalculator = calculator => {
    const originalDivide = calculator.divide

    calculator.divide = () => {
        if (calculator.peekValue() === 0) {
            throw new Error("Division By Zero")
        }
        return originalDivide.apply(calculator)
    }

    calculator.add = () => {
        const result = calculator.getValue() + calculator.getValue()
        calculator.putValue(result)
        return SpeechRecognitionResultList
    }
}
const calculator = new StackCalculator()
decorateCalculator(calculator)