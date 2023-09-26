const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return $('.title'); }

    get inventoryItems() { return $$('.inventory_item'); }

    get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

    get selectDropdownInventory() { return $('select[data-test="product_sort_container"]'); }

    get inventoryItemName() { return $$('.inventory_item_name'); }

    get inventoryItemPrice() { return $$('.inventory_item_price'); }

    get inventoryItemDescription() { return $$('.inventory_item_desc') }

    get cartItems() { return $$('.cart_item'); }

    get checkoutBtn() { return $('#checkout'); }

    async getTestDataFromItem(element) {
        const title = await element.$('.inventory_item_name').getText();
        const price = await element.$('.inventory_item_price').getText();
        const description = await element.$('.inventory_item_desc').getText();
        return { title, price, description };
    }

    async addItemToCartById(id) {
        await this.addItemToCartBtns[id].click();
    }
}

module.exports = { InventoryPage };
