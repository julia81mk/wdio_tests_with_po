async function getAllTextContents(elements) {
    const allTextContents = [];

    for (const elem of elements) {
        const elemTextContent = await elem.getText();
        allTextContents.push(elemTextContent);
    }
    
    return allTextContents;
}

module.exports = { getAllTextContents };
