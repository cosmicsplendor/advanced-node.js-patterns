const evenNumbers = new Proxy([], {
    get: (target, index) => index * 2,
    has: (target, el) => el % 2 === 0
})
console.log(evenNumbers[10])
console.log(4 in evenNumbers)