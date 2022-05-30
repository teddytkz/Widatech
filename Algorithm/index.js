function findCombination(l) {
    let combination = [[]]
    for (let i = 1; i < 9; i++) {
        let lenNumber = combination.length
        for (let j = 0; j < lenNumber; j++) {
            combination.push(combination[j].concat(i))
        }
    }
    return combination.filter(combinations => combinations.length === l)
}

function section3(l, t) {
    let combinations = findCombination(l)
    return combinations.filter(combination => combination.reduce((a, b) => a + b) === t)
}

// Example
console.log(section3(3, 6))
console.log(section3(3, 8))
console.log(section3(4, 5))