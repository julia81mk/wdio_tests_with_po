const { pages } = require('../pages/Pages');
const { parsePrice } = require('../helpers/parsePrise');
const { getAllTextContents } = require('../helpers/getAllTextContents');




describe('Sorting dropdown', () => {
    before(async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');

    })

    const selectOptions = [
        { option: "az", sort: (elements) => elements.slice().sort() },
        { option: "za", sort: (elements) => elements.slice().sort((a, b) => a < b ? 1 : -1) },
        { option: "lohi", sort: (elements) => elements.slice().sort((a, b) => parsePrice(a) - parsePrice(b)) },
        { option: "hilo", sort: (elements) => elements.slice().sort((a, b) => parsePrice(b) - parsePrice(a)) }
    ];


    it('Test sorting Dropdown option', async () => {
        for (const { option, sort } of selectOptions) {
            await (pages.inventoryPage.selectDropdownInventory).selectByAttribute('value', option);
            const labelElements = await getAllTextContents(await pages.inventoryPage.inventoryItemName);
            const priceElements = await getAllTextContents(await pages.inventoryPage.inventoryItemPrice);
            const elements = option === "az" || option === "za" ? labelElements : priceElements;
            const expectedResult = sort(elements);
            expect(elements).toEqual(expectedResult);
        }

    });

});