const createObserver = (target, observer) => {
    return new Proxy(target, {
        set (obj, key, val) {
            if (obj[key] !== val) {
                const prev = obj[key]
                obj[key] = val
                observer({obj, key, prev, cur: val})
            }
            return true
        }
    })
}

const calculateTotal = ({subTotal, tax, discount}) => subTotal + tax - discount
const invoice = {
    subTotal: 1000,
    tax: 130,
    discount: 50
}
const initalTotal = calculateTotal(invoice)
console.log({initalTotal})
const invoiceObservable = createObserver(invoice, ({obj, key, prev, cur}) => {
    const curTotal = calculateTotal(obj)
    console.log(`${curTotal} is the current total, since ${key} changed from ${prev} to ${cur}`)
})
invoiceObservable.subTotal += 100