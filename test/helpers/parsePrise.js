
function parsePrice(pricevalue) {
    const priceText = pricevalue.split('$').pop();
    return Number(parseFloat(priceText).toFixed(2));
};

module.exports = { parsePrice };
