function generateRandomIntsInRange(min, max) {
    const quantity = getRandomInt(Math.min(1, max), max);
    console.log('--==> quantity: ', quantity);
    const numbersCollectionSet = new Set();
    while (numbersCollectionSet.size < quantity) {
        numbersCollectionSet.add(getRandomInt(min, max));
    }
    return Array.from(numbersCollectionSet);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = { generateRandomIntsInRange };
