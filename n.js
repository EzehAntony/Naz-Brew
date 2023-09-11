const data = [
    { price: 10 },
    { price: 10 },
    { price: 10 },
    { price: 10 },
    { price: 10 },
    { price: 10 },
]

let amount = data.map((e) => {
    return e.price
})

let a = amount.reduce((a, b) => { return a + b })

console.log(a)