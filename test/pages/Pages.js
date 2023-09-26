const { InventoryPage } = require('./Inventory.page');
const { LoginPage } = require('./Login.page');
const { ShopingCartPage } = require('./ShopingCart.page');
const { ChekoutPage } =  require('./Chekout.page');

module.exports = {
    pages: {
        loginPage: new LoginPage(),
        inventoryPage: new InventoryPage(),
        shopingCartPage: new ShopingCartPage(),
        chekoutPage: new ChekoutPage()
    },
};
