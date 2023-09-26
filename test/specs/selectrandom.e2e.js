const { pages } = require('../pages/Pages');
const { generateRandomIntsInRange } = require('../helpers/generateRandomIntsInRange');



describe('Select random', () => {
    before(async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');
    })

    it('Add severel item to the card', async () => {
        const selectedItems = [];
        const elements = await pages.inventoryPage.inventoryItems;
        const randomElementsIndexes = generateRandomIntsInRange(0, elements.length - 1);
        // console.log('===1====>>>>> randomElementsIndexes: ', randomElementsIndexes);

        for (const idx of randomElementsIndexes) {
            const inventoryItem = elements[idx];
            const elemTestData = await pages.inventoryPage.getTestDataFromItem(inventoryItem);
            selectedItems.push(elemTestData);
            await inventoryItem.$('[id^="add-to-cart"]').click();
        }

        await pages.inventoryPage.shopingCart.click();

        const itemsInCart = [];
        const elementsInCart = await pages.inventoryPage.cartItems;

        for (const elementInCart of elementsInCart) {
            const elemTestData = await pages.inventoryPage.getTestDataFromItem(elementInCart); 
            itemsInCart.push(elemTestData);
        }

        // console.log('=======>>>>> selectedItems: ', selectedItems);

        expect(selectedItems.length).toEqual(itemsInCart.length);

        for (let i = 0; i < selectedItems.length; i++) {
            expect(selectedItems[i]).toEqual(itemsInCart[i]);  
        }
    });

}) 








