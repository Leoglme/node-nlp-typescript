import nlp from 'node-nlp-typescript'

const point = new nlp.Point()
console.log({
    x: point.x,
    y: point.y
})

point.move(5, 10)

console.log({
    x: point.x,
    y: point.y
})
