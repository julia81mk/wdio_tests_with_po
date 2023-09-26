const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class ChekoutPage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    get firstNameInput() { return $('#first-name'); }

    get lastNameInput() { return $('#last-name'); }

    get zipCodeInput() { return $('#postal-code'); }

    get continueBtn() { return $('#continue'); }

    get cartItems() { return $$('.cart_item'); } ;

    async fillCheckoutForm(user) {
        await this.firstNameInput.setValue(user.firstName);
        await this.lastNameInput.setValue(user.lastName);
        await this.zipCodeInput.setValue(user.zipCode);
    }
}

module.exports = { ChekoutPage };