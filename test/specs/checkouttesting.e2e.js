const { pages } = require('../pages/Pages');
const { generateRandomIntsInRange } = require('../helpers/generateRandomIntsInRange');
const { createRandomUser } = require('../helpers/createRandomUser');
const { parsePrice } = require('../helpers/parsePrise');
const { Console } = require('console');

describe('CheckoutPage', () => {
    before(async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');
    })

    it('Checkout purchase', async () => {
        const selectedItems = [];
        const elements = await pages.inventoryPage.inventoryItems;
        const randomElementsIndexes = generateRandomIntsInRange(0, elements.length - 1);

        for (const idx of randomElementsIndexes) {
            const inventoryItem = elements[idx];
            const elemTestData = await pages.inventoryPage.getTestDataFromItem(inventoryItem);
            selectedItems.push(elemTestData);
            await inventoryItem.$('[id^="add-to-cart"]').click();
        }

        await pages.inventoryPage.shopingCart.click();
        await pages.inventoryPage.checkoutBtn.click();

        const user = createRandomUser();
        await pages.chekoutPage.fillCheckoutForm(user);
        console.log ('>>>>>>RundomUSER',user )


        await pages.chekoutPage.continueBtn.click();

        const itemsInCheckout = [];
        const elementsInCeckout = await pages.chekoutPage.cartItems;

        for (const element of elementsInCeckout) {
            const elemTestData = await pages.inventoryPage.getTestDataFromItem(element);
            itemsInCheckout.push(elemTestData);
        }

        expect(selectedItems.length).toEqual(itemsInCheckout.length);

        for (let i = 0; i < selectedItems.length; i++) {
            expect(selectedItems[i]).toEqual(itemsInCheckout[i]);
        }

    })

    it('Verify calculated Total Price', async () => {
        const priceElements = await pages.inventoryPage.inventoryItemPrice;
        //const price = await element.$('.inventory_item_price').getText();
        let totalItemsinCardPrice = 0;
        for (const element of priceElements) {
            const itemPriceText = await element.getText();
            const itemPrice = parsePrice(itemPriceText);
            totalItemsinCardPrice += itemPrice
        }

        let totalExpectedPrice = parsePrice(await pages.shopingCartPage.totalPrice.getText());
        console.log ('>>>>>>priceTotal',totalExpectedPrice )
        expect(totalItemsinCardPrice).toEqual(totalExpectedPrice);

        let taxforItem = parsePrice(await pages.shopingCartPage.taxPrice.getText());
        console.log ('>>>>>>priceTotal',taxforItem )

        let totalPriceonSite = parsePrice(await pages.shopingCartPage.EndPrice.getText());
        console.log ('>>>>>>priceTotalon Site',totalPriceonSite )

        let expectedPrice =  totalItemsinCardPrice + taxforItem

        console.log ('>>>>>>My price total + tax for items',expectedPrice )

        expect(expectedPrice).toEqual(totalPriceonSite);


    })
}) 