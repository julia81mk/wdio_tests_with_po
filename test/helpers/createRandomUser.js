const { faker } = require('@faker-js/faker');

function createRandomUser() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        zipCode: faker.location.zipCode(),
    };
}

module.exports = { createRandomUser };
