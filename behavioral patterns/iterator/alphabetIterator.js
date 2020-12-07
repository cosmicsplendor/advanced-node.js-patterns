const createAlphabetIterator = function() {
    const A_CHAR_CODE = 65
    const Z_CHAR_CODE = 90
    curIteration = A_CHAR_CODE
    return {
        next() {
            if (curIteration > Z_CHAR_CODE) {
                return {
                    done: true
                }
            }
            const curChar = String.fromCodePoint(curIteration)
            curIteration++
            return {
                done: false,
                value: curChar
            }
        }
    }
}
const alphabetIterator = createAlphabetIterator()

let iterationResult = alphabetIterator.next()
while (!iterationResult.done) {
    console.log(iterationResult.value)
    iterationResult = alphabetIterator.next()
}
